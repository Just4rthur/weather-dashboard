import { useState } from "react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city);
    setCity("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl flex items-center gap-3 bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl p-3 border border-gray-200"
    >
      {/* Input wrapper with icon */}
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
        />

        {/* Clear button (❌) */}
        {city && (
          <button
            type="button"
            onClick={() => setCity("")}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-red-500 transition"
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
  );
}

export default SearchBar;
