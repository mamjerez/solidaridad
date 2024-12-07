import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { InformacionesComponent } from '@app/commons/components/informaciones/informaciones.component';

@Component({
	selector: 'app-limpieza-viaria',
	standalone: true,
	imports: [InformacionesComponent],
	templateUrl: './limpieza-viaria.component.html',
	styleUrl: './limpieza-viaria.component.scss'
})
export default class LimpiezaViariaComponent {
	private readonly router = inject(Router);

	public tag = 'limpiezaViaria';

	addCom(): void {
		this.router.navigateByUrl('addCom/' + this.tag);
	}
}
