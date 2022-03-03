import { Moment } from "moment";

interface Coord {
    lon: number;
    lat: number;
}

interface Weather {
    id: number,
    main: string,
    description: string,
    icon: string
}

interface Main {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
}

interface Wind {
    speed: number,
    deg: number
}

interface Clouds {
    all: number
}

interface Sys {
    type: number,
    id: number,
    message: number,
    country: string,
    sunrise: number,
    sunset: number
}

interface City {
    id: number,
    name: string,
    coord: Coord,
    country: string,
    population: number,
    timezone: number
}

interface TempInfo {
    day: number,
    min: number,
    max: number,
    night: number,
    eve: number,
    morn: number
}

interface FeelsLikeDailyForecast {
    day: number,
    night: number,
    eve: number,
    morn: number
}

export interface CurrentWeatherResponse {
    coord: Coord,
    weather: Weather[],
    base: string,
    main: Main,
    visibility: number,
    wind: Wind,
    clouds: Clouds,
    dt: number,
    sys: Sys,
    timezone: number,
    id: number,
    name: string,
    cod: number
}

interface RainStatus {
    '1h': number
}

interface Current {
    dt: number,
    sunrise: number,
    sunset: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    visibility: number,
    windspeed: number,
    wind_deg: number,
    weather: Weather[],
    rain: RainStatus,
}

export interface Daily {
    dt: number,
    sunrise: number,
    sunset: number,
    moonrise: number,
    moonset: number,
    moon_phase: number,
    temp: TempInfo,
    feels_like: FeelsLikeDailyForecast,
    pressure: number,
    humidity: number,
    dew_point: number,
    wind_speed: number,
    wind_deg: number,
    weather: Weather[],
    clouds: number,
    pop: number,
    rain: number,
    uvi: number
}

export interface DailyForecastResponse {
    lat: number,
    lon: number,
    timezone: string,
    timezone_offset: number,
    current: Current,
    daily: Daily[],
    alerts: any[], 
}

export interface CurrentWeatherForecast {
    main: string,
    temperature: number;
    tempMin: number;
    tempMax: number;
    humidity: number;
    airPressure: number;
    windSpeed: number;
    sunRise: number;
    sunset: number;
    currentTimeAndDate: Date;
    country: string;
    city: string;
    dt: number;
}

export interface DailyForecast {
    day: any,
    min: number,
    max: number,
    main: string,
}

export interface Cities {
    cityName: string,
    lat: number,
    lon: number,
    temp: number,
}