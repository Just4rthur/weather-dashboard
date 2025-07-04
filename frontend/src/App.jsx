import { useState } from "react";
import {
  getForecastByCoords,
  getWeatherByCoords,
  getAIWeatherSummary,
} from "./api/weather";
import SearchBar from "./components/SearchBar";
import WeatherInfo from "./components/WeatherInfo";
import MapView from "./components/MapView";
import Forecast from "./components/Forecast";

const AISummary = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="p-4 my-4 bg-blue-100 border-l-4 border-blue-500">
      <p className="text-blue-800">{summary}</p>
    </div>
  );
};

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [aiSummary, setAiSummary] = useState("");

  const handleSearch = async (location) => {
    const { lat, lon } = location;
    const weatherData = await getWeatherByCoords(lat, lon);
    const forecastData = await getForecastByCoords(lat, lon);
    setWeather(weatherData);
    setForecast(forecastData);

    const summaryData = await getAIWeatherSummary(weatherData);
    setAiSummary(summaryData.summary);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-2">
        🌤️ Weather Dashboard
      </h1>

      <div className="p-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      <WeatherInfo weather={weather} />
      <AISummary summary={aiSummary} />
      <Forecast data={forecast} />
      {weather && <MapView lat={weather.coord.lat} lon={weather.coord.lon} />}
    </div>
  );
}

export default App;
