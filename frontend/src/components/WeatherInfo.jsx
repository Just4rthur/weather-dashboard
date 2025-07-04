const WeatherInfo = ({ weather }) => {
  if (!weather) return null;
  return (
    <div>
      <h2>📍 {weather.name}, {weather.sys.country}</h2>
      <p>🌡️ Temp: {weather.main.temp}°C</p>
      <p>☁️ {weather.weather[0].description}</p>
      <p>💨 Wind: {weather.wind.speed} km/h</p>
    </div>
  );
};

export default WeatherInfo;
