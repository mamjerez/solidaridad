import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

@Component({
	selector: 'app-secretarias-reuniones',
	imports: [CardMenuComponent],
	templateUrl: './secretarias-reuniones.component.html',
	styleUrl: './secretarias-reuniones.component.scss'
})
export default class SecretariasReunionesComponent {
	private readonly _router = inject(Router);

	navigateTo(page: string): void {
		this._router.navigate([page]);
	}
}
