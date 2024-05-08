import { useEffect, useRef, useState } from "react";
import getData from "../../api/getData";
import { Game } from "./Autocomplete.types";
import loadingGif from "../../assets/loading.gif";

function Autocomplete() {
  const [inputValue, setInputValue] = useState("");
  const [suggestionsList, setSuggestionsList] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const selectValue = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (inputValue !== selectValue.current) {
      setIsSearching(true);
      setIsLoading(true);
      const timeoutId = setTimeout(() => {
        fetchSuggestions(inputValue);
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setIsSearching(false);
      setSuggestionsList([]);
    }
  }, [inputValue]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const fetchSuggestions = async (value: string) => {
    if (value.trim() === "") {
      setSuggestionsList([]);
      setIsSearching(false);
      setIsLoading(false);
      return;
    }

    try {
      const suggestions = await getData(value);
      setSuggestionsList(suggestions);
      setIsSearching(suggestions.length === 0);
    } catch (error) {
      console.error("Failed to fetch suggestions", error);
      setSuggestionsList([]);
      setIsSearching(false);
    } finally {
      setIsLoading(false);
    }
  };

  function highlightMatch(item: string) {
    const startIndex = item.toLowerCase().indexOf(inputValue.toLowerCase());
    if (startIndex === -1) return <span>{item}</span>;
    const endIndex = startIndex + inputValue.length;
    return (
      <>
        {item.substring(0, startIndex)}
        <span className="highlighted-text">
          {item.substring(startIndex, endIndex)}
        </span>
        {item.substring(endIndex)}
      </>
    );
  }

  return (
    <div className="autocomplete-container">
      <label>Choose a game:</label>
      <input
        className="autocomplete-input"
        placeholder="Start typing something..."
        type="text"
        value={inputValue}
        onChange={(e) => handleInputChange(e)}
      ></input>
      {isLoading && (
        <img alt="loading" className="loading" src={loadingGif}></img>
      )}
      {suggestionsList.length > 0 && (
        <div className="list-container">
          {suggestionsList.map((g) => (
            <button
              className="list-element"
              key={g.gameID}
              id={`game-button-${g.gameID}`}
              onClick={() => {
                setInputValue(g.external);
                setIsSearching(false);
                selectValue.current = g.external;
                setSuggestionsList([]);
              }}
              aria-label={`Select game ${g.external}`}
            >
              {highlightMatch(g.external)}
            </button>
          ))}
        </div>
      )}

      {!isLoading &&
        suggestionsList.length === 0 &&
        inputValue &&
        isSearching && (
          <div className="list-container-empty">No value found.</div>
        )}

      <div className="autocomplete-selected-value">
        Selected value: {selectValue.current}
      </div>
    </div>
  );
}

export default Autocomplete;
