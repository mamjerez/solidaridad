import { Component } from '@angular/core';

import BotonesAddComponent from '@app/commons/components/botones-add/botones-add.component';
import InformacionesComponent from '@app/commons/components/informaciones/informaciones.component';

@Component({
	selector: 'app-comision-participacion-ciudadana-hospital',
	imports: [InformacionesComponent, BotonesAddComponent],
	templateUrl: './comision-participacion-ciudadana-hospital.component.html',
	styleUrl: './comision-participacion-ciudadana-hospital.component.scss'
})
export default class ComisionParticipacionCiudadanaHospitalComponent {
	public tag = 'comisionParticipacionCiudadanaHospital';
}
