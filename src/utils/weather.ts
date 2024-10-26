import { ForecastData, GroupedWeatherData } from '../interface';

export const groupWeatherByDay = (data: ForecastData | null): GroupedWeatherData => {
  if (!data) return {};
  return data.list.reduce((acc: GroupedWeatherData, item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });

    if (!acc[day]) acc[day] = [];
    acc[day].push(item);

    return acc;
  }, {});
}
