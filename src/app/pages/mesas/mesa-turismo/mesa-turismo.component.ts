import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { InformacionesComponent } from '@app/commons/components/informaciones/informaciones.component';

@Component({
	selector: 'app-mesa-turismo',

	imports: [InformacionesComponent],

	templateUrl: './mesa-turismo.component.html',
	styleUrl: './mesa-turismo.component.scss'
})
export default class MesaTurismoComponent {
	private readonly router = inject(Router);

	public tag = 'mesaTurismo';

	addCom(): void {
		this.router.navigateByUrl('addCom/' + this.tag);
	}
}
