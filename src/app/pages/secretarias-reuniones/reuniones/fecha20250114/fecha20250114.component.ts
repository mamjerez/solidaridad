import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { InformacionesComponent } from '@app/commons/components/informaciones/informaciones.component';

@Component({
	selector: 'app-fecha20250114',
	imports: [InformacionesComponent],
	templateUrl: './fecha20250114.component.html',
	styleUrl: './fecha20250114.component.scss'
})
export default class Fecha20250114Component {
	private readonly router = inject(Router);
	private readonly _location = inject(Location);

	public tag = 'Fecha20250114';

	addCom(): void {
		this.router.navigateByUrl('addComEjecutiva/' + this.tag);
	}

	volver(): void {
		this._location.back();
	}
}
