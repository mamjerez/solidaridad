import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

@Component({
	selector: 'app-onda-jerez-radio',
	imports: [CardMenuComponent],
	templateUrl: './onda-jerez-radio.component.html',
	styleUrl: './onda-jerez-radio.component.scss'
})
export default class OndaJerezRadioComponent {
	private readonly _router = inject(Router);

	navigateTo(path: string) {
		this._router.navigate([path]);
	}
}
