import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';
@Component({
	selector: 'app-reivindicaciones',
	standalone: true,
	imports: [CardMenuComponent],

	templateUrl: './reivindicaciones.component.html',
	styleUrl: './reivindicaciones.component.scss'
})
export default class ReivindicacionesComponent {
	private _router = inject(Router);

	navigateTo(path: string) {
		if (path.startsWith('http')) {
			window.open(path, '_blank');
		} else {
			this._router.navigate([path]);
		}
	}
}
