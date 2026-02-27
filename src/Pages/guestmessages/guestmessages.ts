import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Guestcard } from '../guestcard/guestcard';

@Component({
  selector: 'app-guestmessages',
  standalone:true,
  imports: [FormsModule, CommonModule, Guestcard],
  templateUrl: './guestmessages.html',
  styles: ``,
})
export class Guestmessages {
  name:string = '';
  message:string = '';
  guests:any[] = [];

  onAdd(){
    this.guests.push({id:crypto.randomUUID(), name:this.name, message:this.message});
    this.name = '';
    this.message = '';
  }

  onDelete(id:string){
    let index = this.guests.findIndex(g => g.id === id);
    if(index !== -1){
      this.guests.splice(index, 1);
    }
  }
}
