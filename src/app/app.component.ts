import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { FooterComponent } from './layouts/footer/footer.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';

import { CookieConsentComponent } from './commons/components/cookie-consent.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	standalone: true,
	imports: [NavbarComponent, FooterComponent, RouterOutlet, CookieConsentComponent]
})
export class AppComponent implements OnInit {
	private _router = inject(Router);
	public showFooter = true;

	ngOnInit() {
		this._router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				const rutasSinFooter = ['/laPlata', '/ruta2']; // Rutas donde se oculta el footer
				this.showFooter = !rutasSinFooter.includes(event.urlAfterRedirects);
			}
		});
	}
}
