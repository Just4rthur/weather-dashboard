import axios from "axios";

const BASE_URL = "/api";

export const getWeatherByCoords = async (lat, lon) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: { lat, lon },
  });

  return response.data;
};

export const getForecastByCoords = async (lat, lon) => {
  const response = await axios.get(`${BASE_URL}/forecast`, {
    params: { lat, lon },
  });
  return response.data;
};

export const getGeoSuggestions = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/geo`, {
      params: { q: query },
    });
    // The API is expected to return an array of suggestions.
    // If it returns something else, return an empty array to prevent errors.
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching geo suggestions:", error);
    // On error, return an empty array to ensure the app doesn't crash.
    return [];
  }
};
