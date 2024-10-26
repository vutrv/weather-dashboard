import React from 'react';
import styles from './TemperatureToggle.module.css';

interface Props {
  isCelsius: boolean;
  toggleTemperatureUnit: () => void;
}

const TemperatureToggle: React.FC<Props> = ({ isCelsius, toggleTemperatureUnit }) => {
  return (
    <div className={styles.temperatureToggle}>
      <label className={styles.toggleLabel}>°C</label>
      <input
        type="range"
        className={styles.toggleSlider}
        min="0"
        max="1"
        step="1"
        value={isCelsius ? 0 : 1}
        onChange={toggleTemperatureUnit}
      />
      <label className={styles.toggleLabel}>°F</label>
    </div>
  );
};

export default TemperatureToggle;
