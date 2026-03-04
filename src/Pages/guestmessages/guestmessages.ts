import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Guestcard } from '../guestcard/guestcard';
import { form } from '@angular/forms/signals';
import { authService } from '../../services/sessionSignal';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-guestmessages',
  standalone:true,
  imports: [FormsModule, CommonModule, Guestcard],
  templateUrl: './guestmessages.html',
  styles: ``,
})
export class Guestmessages {
  private http = inject(HttpClient);
  private authService = inject(authService);

  currentUser = Inject('currentUser');
  name:string = '';
  message:string = '';
  guests:any[] = [];
  user = this.authService.currentUser;
  constructor(){
    this.http.get<any[]>('https://localhost:7016/api/guestmessages')
      .subscribe(data => {
        console.log(data);
        this.guests = data;
      });
      
  }
  async onAdd(){
      const messages = {
        "GuestName": this.name,
        "Message": this.message
      }
      this.http.post('https://localhost:7016/api/guestmessages', messages)
        .subscribe(data => {
          console.log(data);
        });
      console.log(this.name, this.message);
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
