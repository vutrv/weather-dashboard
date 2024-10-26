import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { WiThermometer, WiHumidity, WiStrongWind, WiDaySunny } from 'react-icons/wi';
import { WeatherData, ForecastData } from '../interface';
import { ForeCast } from '../components';
import styles from './WeatherSearch.module.css';

interface Props {
  weatherData: WeatherData | null;
  foreCast: ForecastData | null;
  isCelsius: boolean;
  city: string;
  setCity: (city: string) => void;
  onSearch: (city: string) => void;
  isLoading: boolean;
  error: string;
}

const WeatherSearch: React.FC<Props> = ({ weatherData, foreCast, isCelsius, city, setCity, onSearch, isLoading, error }) => {

  return (
    <div className={styles.weatherSearch}>
      <input
        type="text"
        className={styles.input}
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onSearch(city)}
        placeholder="City"
      />
      <button className={styles.button} onClick={() => onSearch(city)}>Search</button>

      <div className={styles.container}>
        {isLoading ? <div className={styles.loaderContainer}>
          <ClipLoader color="#36d7b7" size={50} />
        </div> : error ? (
          <p className={styles.error}>{error}</p>) : weatherData ? (
            <div className={styles.weatherInfo}>
              <h2 className={styles.cityName}>{weatherData.name}</h2>
              <div className={styles.detailContainer}>
                <div className={styles.weatherDetails}>
                  <div className={styles.weatherItem}>
                    <WiThermometer size={30} />
                    <p>Temperature: {weatherData.main.temp}°{isCelsius ? 'C' : 'F'}</p>
                  </div>
                  <div className={styles.weatherItem}>
                    <WiHumidity size={30} />
                    <p>Humidity: {weatherData.main.humidity}%</p>
                  </div>
                  <div className={styles.weatherItem}>
                    <WiStrongWind size={30} />
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                  </div>
                  <div className={styles.weatherItem}>
                    <WiDaySunny size={30} />
                    <p>Conditions: {weatherData.weather[0].description}</p>
                  </div>
                </div>
                <div className={styles.foreCastDetails}>
                  <ForeCast data={foreCast} isCelsius={isCelsius} />
                </div>
              </div>

            </div>
          ) : <p>Enter a city name to see the weather information.</p>}
      </div>
    </div>
  );
};

export default WeatherSearch;
