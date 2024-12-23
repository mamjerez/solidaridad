import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { BotonesAddComponent } from '@app/commons/components/botones-add/botones-add.component';
import { GaleriaFotosComponent } from '@app/commons/components/galeria-fotos/galeria-fotos.component';
import { InformacionesComponent } from '@app/commons/components/informaciones/informaciones.component';

@Component({
	selector: 'app-casas-abandonadas',
	imports: [GaleriaFotosComponent, InformacionesComponent, BotonesAddComponent],
	templateUrl: './casas-abandonadas.component.html',
	styleUrl: './casas-abandonadas.component.scss'
})
export default class CasasAbandonadasComponent {
	private readonly router = inject(Router);
	public tag = 'casaLaPlata';

	addCom(): void {
		console.log(this.tag);
		this.router.navigateByUrl('addCom/' + this.tag);
	}
}
