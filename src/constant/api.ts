const WEATHER_DATA_URL = `${import.meta.env.VITE_WEATHER_API_BASE_URL}/data/2.5/weather`;
const WEATHER_FORECAST_URL = `${import.meta.env.VITE_WEATHER_API_BASE_URL}/data/2.5/forecast`;
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export {
    WEATHER_DATA_URL,
    WEATHER_FORECAST_URL,
    API_KEY
}