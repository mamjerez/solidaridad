import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

@Component({
	selector: 'app-intervencion20241127',
	imports: [CardMenuComponent],
	templateUrl: './intervencion20241127.component.html',
	styleUrl: './intervencion20241127.component.scss'
})
export default class Intervencion20241127Component {
	private readonly _router = inject(Router);
	private readonly _location = inject(Location);

	navigateTo(url: string): void {
		window.open(url, '_blank');
	}

	volver(): void {
		this._location.back();
	}
}
