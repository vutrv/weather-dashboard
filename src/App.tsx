import React, { useState, useEffect } from 'react';
import { WeatherSearch, WeatherHistory, TemperatureToggle } from './components';
import { WeatherData, ForecastData, Location } from './interface';
import { WEATHER_DATA_URL, WEATHER_FORECAST_URL, API_KEY } from './constant';
import './App.css';

const App: React.FC = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isCelsius, setIsCelsius] = useState(true);
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [foreCast, setForeCast] = useState<ForecastData | null>(null);
  const [location, setLocation] = useState<Location | null>(null);

  const handleSearch = async (searchCity: string) => {
    if (!searchCity) return;
    setIsLoading(true);
    setError('');

    try {
      const weatherResponse = await fetch(
        `${WEATHER_DATA_URL}?q=${searchCity}&appid=${API_KEY}&units=${isCelsius ? 'metric' : 'imperial'}`
      );

      const foreCastResponse = await fetch(
        `${WEATHER_FORECAST_URL}?q=${searchCity}&appid=${API_KEY}&units=${isCelsius ? 'metric' : 'imperial'}`
      );

      if (!weatherResponse.ok || !foreCastResponse.ok) throw new Error('City not found');

      const weatherData = await weatherResponse.json();
      const foreCastData = await foreCastResponse.json();
      setWeatherData(weatherData);
      setForeCast(foreCastData);
      addToSearchHistory(searchCity);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const getWeatherInfoByGeoLocation = async () => {
    if (!location) return;
    setIsLoading(true);
    setError('');

    try {
      const weatherResponse = await fetch(
        `${WEATHER_DATA_URL}?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=${isCelsius ? 'metric' : 'imperial'}`
      );

      const foreCastResponse = await fetch(
        `${WEATHER_FORECAST_URL}?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=${isCelsius ? 'metric' : 'imperial'}`
      );

      if (!weatherResponse.ok || !foreCastResponse.ok) throw new Error('Location not found');

      const weatherData = await weatherResponse.json();
      const foreCastData = await foreCastResponse.json();
      setWeatherData({...weatherData, name: 'Your location'});
      setForeCast(foreCastData);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  const addToSearchHistory = (city: string) => {
    const updatedHistory = [city, ...searchHistory]
      .filter((item, index, self) => self.indexOf(item) === index) // Remove duplicates
      .slice(0, 5); // Keep last 5
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prev) => !prev);
  };

  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          setError("Location access denied or not available.");
          console.error(err);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    location && getWeatherInfoByGeoLocation();
  }, [location])

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>
      <TemperatureToggle isCelsius={isCelsius} toggleTemperatureUnit={toggleTemperatureUnit} />
      <WeatherSearch weatherData={weatherData} foreCast={foreCast} isCelsius={isCelsius} city={city} setCity={setCity} onSearch={handleSearch} isLoading={isLoading} error={error}/>
      <WeatherHistory searchHistory={searchHistory} setCity={setCity} onSearch={handleSearch} />
    </div>
  );
};

export default App;
