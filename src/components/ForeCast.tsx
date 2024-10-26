import React, { useMemo } from 'react';
import { groupWeatherByDay } from '../utils';
import { ForecastData } from '../interface';
import styles from './Forecast.module.css';

interface WeatherDisplayProps {
  data: ForecastData | null;
  isCelsius: boolean;
}

const ForeCast: React.FC<WeatherDisplayProps> = ({ data, isCelsius }) => {
  const groupedData = useMemo(() => groupWeatherByDay(data), [data]);

  return (
    <div className={styles.container}>
      {Object.keys(groupedData).map(day => (
        <div key={day} className={styles.dayContainer}>
          <h2 className={styles.dayTitle}>{day}</h2>
          <ul>
            {groupedData[day].map(item => {
              const date = new Date(item.dt * 1000);
              const time = date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <li key={item.dt} className={styles.forecastItem}>
                  <span className={styles.time}>{time}</span>
                  <span className={styles.temp}>{item.main.temp}°{isCelsius ? 'C' : 'F'}</span>
                  <span className={styles.description}>{item.weather[0].description}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ForeCast;
