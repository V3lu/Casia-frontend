import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import { provideClientHydration, withNoIncrementalHydration } from '@angular/platform-browser';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { MessageService } from 'primeng/api';
import { apiErrorInterceptor } from 'Shared/Services/api-error.interceptor';
  

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiErrorInterceptor])),
    providePrimeNG({ theme: { preset: Aura } }),
    provideClientHydration(withNoIncrementalHydration()),
    provideCharts(withDefaultRegisterables()),
    MessageService,
  ]
};
