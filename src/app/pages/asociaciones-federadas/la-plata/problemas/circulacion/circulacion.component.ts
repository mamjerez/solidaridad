import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BotonesAddComponent } from '@app/commons/components/botones-add/botones-add.component';

import { GaleriaFotosComponent } from '@app/commons/components/galeria-fotos/galeria-fotos.component';
import { InformacionesComponent } from '@app/commons/components/informaciones/informaciones.component';

@Component({
	selector: 'app-circulacion',

	imports: [GaleriaFotosComponent, InformacionesComponent, BotonesAddComponent],
	templateUrl: './circulacion.component.html',
	styleUrl: './circulacion.component.scss'
})
export default class CirculacionComponent {
	private readonly router = inject(Router);
	public tag = 'circulacionLaPlata';

	addCom(): void {
		console.log(this.tag);
		this.router.navigateByUrl('addCom/' + this.tag);
	}
}
