import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CurrentWeatherResponse, DailyForecastResponse } from '../types/weather-conf.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  private currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private dailyForecastUrl = 'https://api.openweathermap.org/data/2.5/onecall'
  private apiKey = 'fd573565d9f5a023b29db67ebaa010c8';

  constructor(private http: HttpClient) { }

  getCurrentWeatherForecast(lat: number, lon: number): Observable<CurrentWeatherResponse> {
    const params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('appid', this.apiKey)
      .set('units', 'metric');
    return this.http.get<CurrentWeatherResponse>(this.currentWeatherUrl, {params});
  }

  getDailyForecast(lat: number, lon: number): Observable<DailyForecastResponse> {
    const params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('appid', this.apiKey)
      .set('exclude', 'minutely, hourly')
      .set('units', 'metric');
    return this.http.get<DailyForecastResponse>(this.dailyForecastUrl, {params});
  }
}
