import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './products.html',
  styles: ``,
})
export class Products {
contactForm: FormGroup;
  isSubmitting = false;
  ProductImgURL: File | null = null;
  ProductImgUrl2: File | null = null;
  submitted = false;
        //public string ProductName { get; set; }
        //public string ProductDescription { get; set; }
        //public double UnitPrice { get; set; }
        //public int InStock { get; set; }
        //public string ProductImgURL { get; set; }
        //public string ProductImgUrl2 { get; set; }

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      ProductName: ['', [Validators.required]],
      ProductDescription: ['', [Validators.required ]],
      UnitPrice: ['', [Validators.required]],
      InStock: ['', [Validators.required ]],
    });
  }
  onProductImgURL(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.ProductImgURL = file;
    }
  }
   onProductImgUrl2(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.ProductImgUrl2 = file;
    }
  }
  onSubmit() {
    if (this.contactForm.valid && this.ProductImgURL && this.ProductImgUrl2) {
      this.isSubmitting = true;
      const formData = new FormData();
      formData.append('ProductName', this.contactForm.get('ProductName')?.value);
      formData.append('ProductDescription', this.contactForm.get('ProductDescription')?.value);
      formData.append('UnitPrice', this.contactForm.get('UnitPrice')?.value);
      formData.append('InStock', this.contactForm.get('InStock')?.value);
      formData.append('ProductImgUrl2', this.ProductImgUrl2, this.ProductImgUrl2.name);
      formData.append('ProductImgURL', this.ProductImgURL, this.ProductImgURL.name);
      // Replace with your actual backend endpoint
      const endpoint = 'https://api.example.com/upload';
      console.log(this.contactForm.get('ProductName')?.value);
      console.log(this.contactForm.get('ProductDescription')?.value);
      console.log(this.contactForm.get('UnitPrice')?.value);
      console.log(this.contactForm.get('InStock')?.value);
      console.log(this.ProductImgUrl2);
      console.log(this.ProductImgURL);
      this.http.post(endpoint, formData).subscribe({
        next: (res) => {
          console.log('Upload successful', res);
          this.isSubmitting = false;
          this.contactForm.reset();
          this.ProductImgURL = null;
          this.ProductImgUrl2 = null;
        },
        error: (err) => {
          console.error('Upload failed', err);
          this.isSubmitting = false;
        }
      });
    }
  }
}
