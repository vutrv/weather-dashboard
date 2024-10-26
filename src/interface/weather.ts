interface WeatherCondition {
    description: string;
    icon: string;
}

interface MainWeatherInfo {
    temp: number;
    feels_like: number;
    humidity: number;
}

interface Wind {
    speed: number;
}

interface ForecastItem {
    dt: number;
    main: MainWeatherInfo;
    weather: WeatherCondition[];
    wind: Wind;
    dt_txt: string;
}

export interface ForecastData {
    list: ForecastItem[];
}

export interface ForecastResponse {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastItem[]
}

export interface WeatherData {
    name: string;
    main: {
        temp: number;
        humidity: number;
    };
    weather: { description: string }[];
    wind: { speed: number };
}

// export interface WeatherData {
//     name: string;
//     temp: number;
//     humidity: number;
//     description: string;
//     windspeed: number;
// }

export interface GroupedWeatherData {
    [day: string]: ForecastItem[];
}
