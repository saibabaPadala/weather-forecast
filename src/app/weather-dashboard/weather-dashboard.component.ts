import { Component, OnInit } from '@angular/core';
import { WeatherApiServiceService } from '../weather-api-service.service';

@Component({
  selector: 'app-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.css']
})
export class WeatherDashboardComponent implements OnInit {
constructor(private weatherApi: WeatherApiServiceService){}
WeatherData:any={};
dateWiseData:any=[];
cityName:string='Hyderabad';
ngOnInit(): void {
this.getReportbySearch()
}
getReportbySearch(){
  this.weatherApi.getGeoCodeByCityName(this.cityName).subscribe((res:any)=>{
    if(res && res.city && res.city.coord){
      this.weatherApi.getWeatherReport(res.city.coord.lat,res.city.coord.lon).subscribe((resp:any)=>{
        console.log(resp);
        this.WeatherData = resp;
        if(resp && resp.list && resp.list.length>0){
          let tmp:any={}
          let dates = [];
          dates=resp.list.map((i:any)=>i.dt_txt.split(" ")[0]);
          dates = [...new Set(dates)];
          dates.forEach((datestr:any)=>{
            tmp[datestr]={min:null,max:null,pressure:null,humidity:null}
          })
          this.dateWiseData=[];
          dates.forEach((datetxt:any)=>{
            let tmp ={date:null,min:null,max:null,pressure:null,humidity:null}
            tmp["date"]=datetxt;
            tmp["min"]=resp.list.filter((i:any)=>i.dt_txt.split(" ")[0]).map((i:any)=>i.main.temp_min).reduce((prev:number,curr:number)=>prev<curr ? prev : curr)
            tmp["max"]=resp.list.filter((i:any)=>i.dt_txt.split(" ")[0]).map((i:any)=>i.main.temp_max).reduce((prev:number,curr:number)=>prev>curr ? prev : curr)
            tmp["pressure"]=resp.list.filter((i:any)=>i.dt_txt.split(" ")[0]).map((i:any)=>i.main.pressure).reduce((prev:number,curr:number)=>prev>curr ? prev : curr)
            tmp["humidity"]=resp.list.filter((i:any)=>i.dt_txt.split(" ")[0]).map((i:any)=>i.main.humidity).reduce((prev:number,curr:number)=>prev>curr ? prev : curr)
            this.dateWiseData.push(tmp);
          })
          this.dateWiseData.splice(this.dateWiseData.findIndex((i:any)=>i.date==new Date().toISOString().split('T')[0]),1)
          console.log(this.dateWiseData)
        }
      })
    }

  })
}
getValuebyKey(key:any,obj:any){
  return obj[key]
}
}
