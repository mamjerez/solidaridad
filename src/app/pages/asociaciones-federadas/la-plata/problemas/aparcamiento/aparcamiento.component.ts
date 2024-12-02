import { Component } from '@angular/core';

import { GaleriaFotosComponent } from '@app/commons/components/galeria-fotos/galeria-fotos.component';
import { InformacionesComponent } from '@app/commons/components/informaciones/informaciones.component';

@Component({
	selector: 'app-aparcamiento',
	standalone: true,
	imports: [GaleriaFotosComponent, InformacionesComponent],
	templateUrl: './aparcamiento.component.html',
	styleUrl: './aparcamiento.component.scss'
})
export default class AparcamientoComponent {
	public tag = 'aparcamientoLaPlata';
}
