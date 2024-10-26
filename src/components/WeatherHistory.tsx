import React from 'react';
import styles from './WeatherHistory.module.css';

interface Props {
  searchHistory: string[];
  setCity: (city: string) => void;
  onSearch: (city: string) => void;
}

const WeatherHistory: React.FC<Props> = ({ searchHistory, setCity, onSearch }) => {

  const handleHistoryClick = (city: string) => {
    setCity(city)
    onSearch(city);
  };

  return (
    <div className={styles.weatherHistory}>
      <h4>Recent Searches</h4>
      <div className={styles.historyContainer}>
        {searchHistory.length === 0 ? (
          <p>No search history available.</p>
        ) : (
          searchHistory.map((city, index) => (
            <span
              key={index}
              className={styles.historyItem}
              onClick={() => handleHistoryClick(city)}
            >
              {city}
            </span>
          ))
        )}
      </div>
    </div>
  );
};

export default WeatherHistory;
