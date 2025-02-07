import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import InformacionesComponent from '@app/commons/components/informaciones/informaciones.component';
import BotonesAddComponent from '@app/commons/components/botones-add/botones-add.component';
import GestionesComponent from '@app/commons/components/gestiones/gestiones.component';

@Component({
	selector: 'app-a2003',
	imports: [InformacionesComponent, BotonesAddComponent, GestionesComponent],
	templateUrl: './a2003.component.html',
	styleUrl: './a2003.component.scss'
})
export default class A2003Component {
	private readonly router = inject(Router);
	public tag = 'a2003';
	// public gestiones: IGestion[] = [];

	addCom(): void {
		this.router.navigateByUrl('addCom/' + this.tag);
	}
}
