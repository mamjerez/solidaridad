import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { BotonesAddComponent } from '@app/commons/components/botones-add/botones-add.component';

import { GaleriaFotosComponent } from '@app/commons/components/galeria-fotos/galeria-fotos.component';
import { InformacionesComponent } from '@app/commons/components/informaciones/informaciones.component';

@Component({
	selector: 'app-acerado',
	imports: [GaleriaFotosComponent, InformacionesComponent, BotonesAddComponent],
	templateUrl: './acerado.component.html',
	styleUrl: './acerado.component.scss'
})
export default class AceradoComponent {
	private readonly router = inject(Router);
	public tag = 'aceraLaPlata';

	addCom(): void {
		console.log(this.tag);
		this.router.navigateByUrl('addCom/' + this.tag);
	}
}
