import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

@Component({
	selector: 'app-plataformas',

	imports: [CardMenuComponent],
	templateUrl: './plataformas.component.html',
	styleUrl: './plataformas.component.scss'
})
export default class PlataformasComponent {
	private _router = inject(Router);

	navigateTo(path: string) {
		if (path.startsWith('http')) {
			window.open(path, '_blank');
		} else {
			this._router.navigate([path]);
		}
	}
}
