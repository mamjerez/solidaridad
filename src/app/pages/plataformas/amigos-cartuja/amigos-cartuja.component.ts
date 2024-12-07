import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { InformacionesComponent } from '@app/commons/components/informaciones/informaciones.component';

@Component({
	selector: 'app-amigos-cartuja',
	standalone: true,
	imports: [InformacionesComponent],
	templateUrl: './amigos-cartuja.component.html',
	styleUrl: './amigos-cartuja.component.scss'
})
export default class AmigosCartujaComponent {
	private readonly router = inject(Router);

	public tag = '20241210';

	addCom(): void {
		this.router.navigateByUrl('addCom/' + this.tag);
	}
}
