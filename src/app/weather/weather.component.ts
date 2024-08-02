import { Component, EventEmitter, Input } from '@angular/core';
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

  location: string = '';
  searchBox!: boolean
  selectedBox = 0
  isEdit: boolean = false
  amountOfWeatherBoxes: number[] = []
  weatherBoxes: weatherBox[] = []
  colores: string[] = ["bg-slate-300", "bg-amber-300", "bg-pink-300"]

  
  constructor (
    private weatherService: WeatherService,
  ) { }

  addWeatherBox() {
    if ((this.amountOfWeatherBoxes.length + 1) <= 3) {
      this.selectedBox = this.amountOfWeatherBoxes.length + 1
      this.searchBox = !this.searchBox
      console.log(this.selectedBox)
    }
  }

  isSearchBox(index: number) {
    this.searchBox = !this.searchBox
    this.selectedBox = index
    this.isEdit = true
  }

  editWeather() {
    this.weatherService.getWeather(this.location).subscribe(
      (res: any) => {
        const details: weatherBox = {
          index: this.selectedBox,
          weather: res.current.temp_c,
          condition: res.current.condition.text,
          img: res.current.condition.icon,
          city: res.location.name,
          country: res.location.country,
          color: this.colores[this.selectedBox-1]
        }
        this.weatherBoxes[this.selectedBox-1] = details
        this.isEdit = false
      }
    )
  }

  isSearchCancel($event: boolean) {
    this.searchBox = $event
  }

  getLocation($event: string) {
    this.location = $event
    this.searchBox = !this.searchBox
    if (this.isEdit) {
      this.editWeather();
    } else {
      this.weather();
    }
  }
  
  weather() {
    this.weatherService.getWeather(this.location).subscribe(
      (res: any) => {
        const details: weatherBox = {
          index: this.selectedBox,
          weather: res.current.temp_c,
          condition: res.current.condition.text,
          img: res.current.condition.icon,
          city: res.location.name,
          country: res.location.country,
          color: this.colores[this.amountOfWeatherBoxes.length]
        }
        this.amountOfWeatherBoxes.push(this.amountOfWeatherBoxes.length + 1)
        this.weatherBoxes.push(details)
        this.selectedBox = 0
      }
    )
  }

}
