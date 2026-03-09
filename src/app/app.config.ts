import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../services/auth.interceptor';
import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),    
    provideHttpClient(  
      withInterceptors([authInterceptor])
    ),
   provideAnimationsAsync(),
    provideToastr({
          positionClass: 'toast-top-right',
      timeOut: 3000
    })
  ]
};


