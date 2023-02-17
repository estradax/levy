import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthModule } from './app/auth/auth.module';
import { importProvidersFrom } from '@angular/core';
import { apiInterceptor } from './app/lib/api.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    provideHttpClient(withInterceptors([apiInterceptor])),
    importProvidersFrom(AuthModule),
  ],
}).catch((err) => console.error(err));
