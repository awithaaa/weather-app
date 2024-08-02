import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ctit-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ctit-search.component.html',
  styleUrl: './ctit-search.component.css'
})
export class CtitSearchComponent {

  location!: string

  @Output() city = new EventEmitter<string>();

  @Output() cancel = new EventEmitter<boolean>();

  cencalBTN() {
    this.cancel.emit(false)
  }

  submitCity() {
    this.city.emit(this.location)
  }
}
