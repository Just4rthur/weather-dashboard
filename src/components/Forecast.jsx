function Forecast({ data }) {
  if (!data) return null;
  //Extract 1 forecast per day (12:00 PM)
  const daily = data.list.filter((item) => item.dt_txt.includes("12:00:00"));

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2"> 🗓️ 5-Day Forecast</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4">
        {daily.map((item, index) => (
          <div key={index} className="bg-gray-200 p-4 rounded-lg shadow">
            <p className="font-bold">
              {new Date(item.dt_txt).toLocaleDateString()}
            </p>
            <p>🌡️ {item.main.temp}°C</p>
            <p>☁️ {item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
