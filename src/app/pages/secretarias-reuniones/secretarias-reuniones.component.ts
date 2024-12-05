import { Component } from '@angular/core';
import { InformacionesComponent } from '@app/commons/components/informaciones/informaciones.component';

@Component({
	selector: 'app-secretarias-reuniones',
	standalone: true,
	imports: [InformacionesComponent],
	templateUrl: './secretarias-reuniones.component.html',
	styleUrl: './secretarias-reuniones.component.scss'
})
export default class SecretariasReunionesComponent {
	public tag = '20241210';
}
