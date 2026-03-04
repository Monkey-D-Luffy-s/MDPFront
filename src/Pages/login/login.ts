import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authService } from '../../services/sessionSignal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styles: ``,
})
export class Login {
  authservice = inject(authService);
  rounter = inject(Router);
  name:string = '';
  password:string = '';
  async onLogin(){
    const formData = new FormData();
    formData.append('email', this.name);
    formData.append('password', this.password);
    const response = await fetch('https://localhost:7016/api/auth/login', {
      method: 'POST',
      body: formData});
    const data = await response.json();
    console.log(data);
    this.authservice.setSession(data);
    this.rounter.navigate(['/about']);
  }
}
