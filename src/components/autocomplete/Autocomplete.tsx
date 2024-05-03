import { useEffect, useState } from "react";
import getData from "../../api/getData";
import { Game } from "./Autocomplete.types";

function Autocomplete() {
  const [inputValue, setInputValue] = useState("");
  const [suggestionsList, setSuggestionsList] = useState<Game[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (inputValue !== selectedValue) {
      const timeoutId = setTimeout(() => {
        fetchSuggestions(inputValue);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [inputValue]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const fetchSuggestions = async (value: string) => {
    if (value) {
      try {
        const suggestions = await getData(value);
        setSuggestionsList(suggestions);
      } catch (error) {
        console.error("Failed to fetch suggestions", error);
        setSuggestionsList([]);
      }
    } else {
      setSuggestionsList([]);
    }
  };

  function highlightMatch(item: string) {
    const startIndex = item.toLowerCase().indexOf(inputValue.toLowerCase());
    if (startIndex === -1) return <span>{item}</span>;
    const endIndex = startIndex + inputValue.length;
    return (
      <>
        {item.substring(0, startIndex)}
        <strong style={{ color: "blue" }}>
          {item.substring(startIndex, endIndex)}
        </strong>
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
      {suggestionsList.length > 0 && (
        <div className="list-container">
          {suggestionsList.map((g) => (
            <div
              className="list-element"
              key={g.gameID}
              id={g.gameID}
              onClick={() => {
                setInputValue(g.external);
                setSelectedValue(g.external);
                setSuggestionsList([]);
              }}
            >
              {highlightMatch(g.external)}
            </div>
          ))}
        </div>
      )}
      <div className="autocomplete-selected-value">
        Selected value: {selectedValue}
      </div>
    </div>
  );
}

export default Autocomplete;
