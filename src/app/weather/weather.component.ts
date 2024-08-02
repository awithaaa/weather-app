import { Component, Input } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitiesService } from '../service/cities.service';
import { CtitSearchComponent } from '../components/ctit-search/ctit-search.component';
import { weatherBox } from '../../types';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule, CtitSearchComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {

  waetherr!: number
  location: string = '';
  condition!: string
  img!: string
  searchBox!: boolean
  amountOfWeatherBoxes: number[] = []
  weatherBoxes: weatherBox[] = []
  colores: string[] = ["bg-slate-300", "bg-amber-300", "bg-pink-300"]

  
  constructor (
    private weatherService: WeatherService,
  ) { }

  addWeatherBox() {
    if ((this.amountOfWeatherBoxes.length + 1) <= 3) {
      this.isSearchBox()
      console.log(this.amountOfWeatherBoxes)
    }
  }

  isSearchBox() {
    this.searchBox = !this.searchBox
  }

  isSearchCancel($event: boolean) {
    this.searchBox = $event
  }
  
  weather($event: string) {
    this.location = $event
    console.log(this.location)
    this.weatherService.getWeather(this.location).subscribe(
      (res: any) => {
        const details: weatherBox = {
          weather: res.current.temp_c,
          condition: res.current.condition.text,
          img: res.current.condition.icon,
          city: res.location.name,
          country: res.location.country,
          color: this.colores[this.amountOfWeatherBoxes.length]
        }
        this.amountOfWeatherBoxes.push(this.amountOfWeatherBoxes.length + 1)
        this.weatherBoxes.push(details)
        console.log(res)
      }
    )
    this.searchBox = !this.searchBox
  }

}
