import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiServiceService {
  appId='1635890035cbba097fd5c26c8ea672a1'
  weatherApi:string=`https://api.openweathermap.org/data/2.5/forecast?appid=${this.appId}`
  cityApi:string =`https://api.openweathermap.org/data/2.5/forecast?appid=${this.appId}&q=`
  constructor(private http:HttpClient) { }
  getWeatherReport(lat:string,lon:string){
    return this.http.get(`${this.weatherApi}&lat=${lat}&lon=${lon}`);
  }
  getGeoCodeByCityName(city:string){
    return this.http.get(this.cityApi+city);
  }
}
