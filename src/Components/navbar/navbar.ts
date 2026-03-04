import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { authService } from '../../services/sessionSignal';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styles: ``,
})
export class Navbar {
   private authService = inject(authService);

isMenuOpen = false;
islogin = false;
rounter = inject(Router);
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  user = this.authService.currentUser;
  isloggedIn = this.authService.isLoggedIn;
  onLogout(){
    this.authService.logout();
    this.rounter.navigate(['/login']);
  }

  goToProfile(){
    this.rounter.navigate(['/profile']);
  }
}
