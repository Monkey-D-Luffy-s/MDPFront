import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { authService } from '../../services/sessionSignal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styles: ``,
})
export class Register {
  authservice = inject(authService);
  rounter = inject(Router);
  registerForm: FormGroup;
  files: any = { profile: null, signature: null };

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      dob: [''],
      email: [''],
      mobile: [''],
      password: [''],
      address: ['']
    });
  }

  onFileChange(event: any, type: string) {
    this.files[type] = event.target.files[0];
  }

  async onSubmit() {
    const formData = new FormData();
    // Append form fields
    Object.keys(this.registerForm.controls).forEach(key => {
      formData.append(key, this.registerForm.get(key)?.value);
    });
    // Append files
    formData.append('profilePicture', this.files.profile);
    formData.append('signatureFile', this.files.signature);
    var result = await fetch('https://localhost:7016/api/auth/register', {
      method: 'POST',
      body: formData});
    var data = await result.json();
    console.log(data);
    this.authservice.setSession(data);
    this.rounter.navigate(['/about']);
    // Now send formData via HttpClient
  }

}
