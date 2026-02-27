import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guestcard',
  standalone:true,
  imports: [FormsModule, CommonModule],
  templateUrl: './guestcard.html',
  styles: ``,
})
export class Guestcard {
  @Input() childguest:any;
  @Output() delete = new EventEmitter<string>();
  onDelete(id:string){
    this.delete.emit(id);
  }
} 
