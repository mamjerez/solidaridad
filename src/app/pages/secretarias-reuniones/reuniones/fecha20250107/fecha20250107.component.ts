import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { InformacionesComponent } from '@app/commons/components/informaciones/informaciones.component';

@Component({
	selector: 'app-fecha20250107',
	imports: [InformacionesComponent],
	templateUrl: './fecha20250107.component.html',
	styleUrl: './fecha20250107.component.scss'
})
export default class Fecha20250107Component {
	private readonly router = inject(Router);
	public tag = '20250107';

	addCom(): void {
		this.router.navigateByUrl('addCom/' + this.tag);
	}
}
