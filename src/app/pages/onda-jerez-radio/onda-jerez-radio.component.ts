import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

@Component({
	selector: 'app-onda-jerez-radio',
	imports: [CardMenuComponent],
	templateUrl: './onda-jerez-radio.component.html',
	styleUrl: './onda-jerez-radio.component.scss'
})
export default class OndaJerezRadioComponent {
	private readonly _router = inject(Router);
	private readonly _location = inject(Location);

	navigateTo(path: string) {
		this._router.navigate([path]);
	}

	volver(): void {
		this._location.back();
	}
}
