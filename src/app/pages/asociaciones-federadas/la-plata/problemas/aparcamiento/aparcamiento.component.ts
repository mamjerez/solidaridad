import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BotonesAddComponent } from '@app/commons/components/botones-add/botones-add.component';

import { GaleriaFotosComponent } from '@app/commons/components/galeria-fotos/galeria-fotos.component';
import { InformacionesComponent } from '@app/commons/components/informaciones/informaciones.component';

@Component({
	selector: 'app-aparcamiento',
	standalone: true,
	imports: [GaleriaFotosComponent, InformacionesComponent, BotonesAddComponent],
	templateUrl: './aparcamiento.component.html',
	styleUrl: './aparcamiento.component.scss'
})
export default class AparcamientoComponent {
	private readonly router = inject(Router);
	public tag = 'aparcamientoLaPlata';

	addCom(): void {
		console.log(this.tag);
		this.router.navigateByUrl('addCom/' + this.tag);
	}
}
