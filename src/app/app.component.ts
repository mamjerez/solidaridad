import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './layouts/footer/footer.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';

import { CookieConsentComponent } from './commons/components/cookie-consent.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	standalone: true,
	imports: [NavbarComponent, FooterComponent, RouterOutlet, CookieConsentComponent]
})
export class AppComponent {}
