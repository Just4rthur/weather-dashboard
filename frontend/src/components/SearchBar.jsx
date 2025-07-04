import { useState, useEffect, useRef } from "react";
import { getGeoSuggestions } from "../api/weather";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const justSelected = useRef(false);

  // Fetch suggestions from backend
  useEffect(() => {
    if (justSelected.current) {
      justSelected.current = false;
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await getGeoSuggestions(city);
        console.log(res);
        setSuggestions(res || []);
        setShowDropdown(true);
      } catch (error) {
        console.error("Suggestion error:", error);
      }
    };

    if (city.trim().length >= 2) {
      const delay = setTimeout(fetchSuggestions, 300); // debounce
      return () => clearTimeout(delay);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, [city]);

  const handleSelect = (location) => {
    justSelected.current = true;
    const displayName = `${location.name}, ${location.country}`;
    onSearch(location); // now passes full object
    setCity(displayName);
    setSuggestions([]);
    setShowDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim() || suggestions.length === 0) return;
    handleSelect(suggestions[0]);
    setCity("");
  };

  return (
    <div className="relative w-full max-w-xl">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl p-3 border border-gray-200"
      >
        {/* Input + icons */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            📍
          </span>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search city..."
            className="w-full pl-10 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
            onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
          />
          {city && (
            <button
              type="button"
              onClick={() => {
                setCity("");
                setSuggestions([]);
              }}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-red-500"
              aria-label="Clear search"
            >
              ❌
            </button>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="px-5 py-2 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:brightness-110 hover:scale-105 transition"
        >
          🔍
        </button>
      </form>

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((loc, idx) => (
            <li
              key={`${loc.name}-${loc.lat}-${loc.lon}-${idx}`}
              onClick={() => handleSelect(loc)}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
            >
              {loc.name}
              {loc.state ? `, ${loc.state}` : ""}, {loc.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
