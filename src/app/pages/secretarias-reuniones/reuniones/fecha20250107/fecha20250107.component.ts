import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import InformacionesComponent from '@app/commons/components/informaciones/informaciones.component';

@Component({
	selector: 'app-fecha20250107',
	imports: [InformacionesComponent],
	templateUrl: './fecha20250107.component.html',
	styleUrl: './fecha20250107.component.scss'
})
export default class Fecha20250107Component {
	private readonly router = inject(Router);
	private readonly _location = inject(Location);

	public tag = 'Fecha20250107';

	addCom(): void {
		this.router.navigateByUrl('addComEjecutiva/' + this.tag);
	}

	volver(): void {
		this._location.back();
	}
}
