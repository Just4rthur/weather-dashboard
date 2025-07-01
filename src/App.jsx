import { useState } from "react";
import { getWeatherByCity } from "./api/weather";
import SearchBar from "./components/SearchBar";
import WeatherInfo from "./components/WeatherInfo";
import MapView from "./components/MapView";
import Forecast from "./components/Forecast";
import { getForecastByCity } from "./api/weather";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleSearch = async (city) => {
    const data = await getWeatherByCity(city);
    const forecastData = await getForecastByCity(city);

    setWeather(data);
    setForecast(forecastData);
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
      <Forecast data={forecast} />
      {weather && <MapView lat={weather.coord.lat} lon={weather.coord.lon} />}
    </div>
  );
}

export default App;
