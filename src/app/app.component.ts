import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { FooterComponent } from './layouts/footer/footer.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { CookieConsentComponent } from './commons/components/cookie-consent.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	imports: [NavbarComponent, FooterComponent, RouterOutlet, CookieConsentComponent]
})
export class AppComponent implements OnInit {
	private _router = inject(Router);
	private _cadenasOcultarFooter = ['laPlata', 'LaPlata', 'foto', 'resumenPrensa'];
	public showFooter = true;

	ngOnInit() {
		this._router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				const urlActual = event.urlAfterRedirects;
				this.showFooter = !this._cadenasOcultarFooter.some((cadena) => urlActual.includes(cadena));
			}
		});
	}
}
