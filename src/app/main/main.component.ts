import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ForecastService } from '../services/forecast.service';
import { Cities, CurrentWeatherForecast, CurrentWeatherResponse, Daily, DailyForecast, DailyForecastResponse } from '../types/weather-conf.type';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { WeatherDialog } from '../dialog/dialog/dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  public currentWeatherForcast: CurrentWeatherForecast = {
    main: '',
    temperature: 0,
    tempMin: 0,
    tempMax: 0,
    humidity: 0,
    airPressure: 0,
    windSpeed: 0,
    sunRise: 0,
    sunset: 0,
    currentTimeAndDate: new Date(),
    country: 'Slovakia',
    city: 'Košice',
    dt: 0
  }
  public chosenCity: Cities =  {
    cityName: 'Košice',
    lat: 48.716385,
    lon: 21.261074,
    temp: 0,
  }

  private cities: Cities[] = [
    {
      cityName: 'Bratislava',
      lat: 48.148598,
      lon: 17.107748,
      temp: 0,
    },
    {
      cityName: 'Humenné',
      lat: 48.932454,
      lon: 21.907892,
      temp: 0,
    },
    {
      cityName: 'Koromľa',
      lat: 48.7149414,
      lon: 22.2924754,
      temp: 0,
    },
    {
      cityName: 'Košice',
      lat: 48.716385,
      lon: 21.261074,
      temp: 0,
    },
    {
      cityName: 'Michalovice',
      lat: 48.755677,
      lon: 21.918386,
      temp: 0,
    },
    {
      cityName: 'Sobrance',
      lat: 48.74455,
      lon: 22.18136,
      temp: 0,
    }
  ]

  public dailyForecast: DailyForecast[] = [];

  private timeSubscription: Subscription = new Subscription;


  constructor(private forecastService: ForecastService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCurrentWeatherForecast(48.716385, 21.261074);
    this.getDailyForecast(48.716385, 21.261074);
    this.timeSubscription = interval(1000)
           .subscribe(sec => { this.reloadTime(); });
  }

  private loadTemperatureForCities() {
    this.forecastService.getCurrentWeatherForecast
  }

  reloadTime(): void {
    this.currentWeatherForcast.currentTimeAndDate = new Date();
  }

  ngOnDestroy(): void {
    this.timeSubscription.unsubscribe();
 }

 getDailyForecast(lat: number, lon: number): void {
  this.dailyForecast = [];
  this.forecastService.getDailyForecast(lat, lon).subscribe((dailyForecastData: DailyForecastResponse) => {
    dailyForecastData.daily.forEach((data: Daily, index: number) => {
      const today = moment();
      this.dailyForecast.push( { day: moment(today).add(index + 1, 'day'), main: data.weather[0].main, min: Math.round(data.temp.min), max: Math.round(data.temp.max) } );
    });
  });
 }

 openDialog() {
  const dialogRef = this.dialog.open(WeatherDialog, { panelClass: 'full-width-dialog', data: this.cities
  });

  dialogRef.afterClosed().subscribe(result => {
    this.getCurrentWeatherForecast(result.lat, result.lon);
    this.chosenCity.cityName = result.cityName;
  });
 }

  getCurrentWeatherForecast(lat: number, lon: number): void {
    this.forecastService.getCurrentWeatherForecast(lat, lon).subscribe((weatherData: CurrentWeatherResponse) => {
      this.currentWeatherForcast.main = weatherData.weather[0].main;
      this.currentWeatherForcast.temperature = Math.round(weatherData.main.temp);
      this.currentWeatherForcast.tempMax = Math.round(weatherData.main.temp_max);
      this.currentWeatherForcast.tempMin = Math.round(weatherData.main.temp_min);
      this.currentWeatherForcast.humidity = weatherData.main.humidity;
      this.currentWeatherForcast.airPressure = weatherData.main.pressure;
      this.currentWeatherForcast.windSpeed = weatherData.wind.speed;
      this.currentWeatherForcast.sunRise = weatherData.sys.sunrise;
      this.currentWeatherForcast.sunset = weatherData.sys.sunset;
      this.currentWeatherForcast.country = weatherData.sys.country;
      this.currentWeatherForcast.dt = weatherData.dt;
    });
  }

}
