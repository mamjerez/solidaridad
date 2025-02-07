import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import InformacionesComponent from '@app/commons/components/informaciones/informaciones.component';

@Component({
	selector: 'app-mesa-seguridad',
	imports: [InformacionesComponent],
	templateUrl: './mesa-seguridad.component.html',
	styleUrl: './mesa-seguridad.component.scss'
})
export default class MesaSeguridadComponent {
	private readonly router = inject(Router);
	public tag = 'mesaSeguridad';

	addCom(): void {
		this.router.navigateByUrl('addCom/' + this.tag);
	}
}
