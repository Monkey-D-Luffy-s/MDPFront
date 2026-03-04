import { Injectable, signal, computed, inject } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root'})

export class authService {
private userState = signal<any>(null);
router = inject(Router);
currentUser = computed(() => this.userState());
isLoggedIn = computed(() => !!this.userState());

constructor(){
    const savedUser = localStorage.getItem("user_data");
    if(savedUser != null && savedUser != "undefined"){
        this.userState.set(JSON.parse(savedUser));
    }else{
        this.router.navigate(['/login']);
    }
}

setSession(authResult:any){
localStorage.setItem("auth_token", authResult.token.replace(/"/g, ''));
localStorage.setItem("user_data", JSON.stringify(authResult.user));
this.userState.set(authResult.user);
}

logout(){
    this.userState.set(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    this.router.navigate(['/login']);
}

getToken(){
    return localStorage.getItem('auth_token');
}
}