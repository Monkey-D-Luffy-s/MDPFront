import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [FormsModule, CommonModule],
  templateUrl: './navbar.html',
  styles: ``,
})
export class Navbar {
isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
