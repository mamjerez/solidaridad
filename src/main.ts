import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID, enableProdMode, importProvidersFrom } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { AppComponent } from './app/app.component';
import APP_ROUTES from './app/app.routes';
import { environment } from './environments/environment';

registerLocaleData(localeDe, 'de-DE');

if (environment.production) {
	enableProdMode();
}

bootstrapApplication(AppComponent, {
	providers: [
		provideRouter(APP_ROUTES, withComponentInputBinding(), withViewTransitions()),
		importProvidersFrom(BrowserModule, FormsModule, ReactiveFormsModule),
		{
			provide: LocationStrategy,
			useClass: HashLocationStrategy
		},
		provideHttpClient(withInterceptorsFromDi()),
		{ provide: LOCALE_ID, useValue: 'de-DE' }
	]
}).catch((err) => console.error(err));
