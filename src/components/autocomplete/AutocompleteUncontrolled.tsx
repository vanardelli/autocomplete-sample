import { useRef, useState } from "react";
import getData from "../../api/getData";
import { Game } from "./Autocomplete.types";
import loadingGif from "../../assets/loading.gif";

function AutocompleteUncontrolled() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [suggestionsList, setSuggestionsList] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const selectValue = useRef<string | undefined>(undefined);

  console.log("rendering uncontrolled");

  const handleInputChange = () => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current); // Clear existing timeout
    }
    debounceTimeout.current = setTimeout(() => {
      if (inputRef.current) {
        fetchSuggestions(inputRef.current.value);
      }
    }, 300); // Set new timeout
  };

  const fetchSuggestions = async (value: string | undefined) => {
    if (value === undefined || value.trim() === "") {
      setSuggestionsList([]);
      setIsSearching(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
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
    if (inputRef?.current?.value) {
      const startIndex = item
        .toLowerCase()
        .indexOf(inputRef.current.value.toLowerCase());
      if (startIndex === -1) return <span>{item}</span>;
      const endIndex = startIndex + inputRef.current.value.length;
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
  }

  return (
    <div className="autocomplete-container">
      <label>Choose a game:</label>
      <input
        ref={inputRef}
        className="autocomplete-input"
        placeholder="Start typing something..."
        type="text"
        onChange={handleInputChange}
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
                if (inputRef?.current) {
                  inputRef.current.value = g.external;
                }
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
        inputRef?.current?.value &&
        isSearching && (
          <div className="list-container-empty">No value found.</div>
        )}

      <div className="autocomplete-selected-value">
        Selected value: {selectValue.current}
      </div>
    </div>
  );
}

export default AutocompleteUncontrolled;
