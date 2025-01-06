import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

@Component({
	selector: 'app-intervencion20250108',
	imports: [CardMenuComponent],
	templateUrl: './intervencion20250108.component.html',
	styleUrl: './intervencion20250108.component.scss'
})
export default class Intervencion20250108Component {
	private readonly _router = inject(Router);
	private readonly _location = inject(Location);

	navigateTo(url: string): void {
		window.open(url, '_blank');
	}
	volver(): void {
		this._location.back();
	}
}
