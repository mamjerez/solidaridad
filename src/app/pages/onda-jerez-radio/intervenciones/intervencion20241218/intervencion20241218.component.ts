import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

@Component({
	selector: 'app-intervencion20241218',
	imports: [CardMenuComponent],
	templateUrl: './intervencion20241218.component.html',
	styleUrl: './intervencion20241218.component.scss'
})
export default class Intervencion20241218Component {
	private readonly _router = inject(Router);
	private readonly _location = inject(Location);

	navigateTo(url: string): void {
		window.open(url, '_blank');
	}
	volver(): void {
		this._location.back();
	}
}
