import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';
import { InformacionesComponent } from '@app/commons/components/informaciones/informaciones.component';

@Component({
	selector: 'app-secretarias-reuniones',
	standalone: true,
	imports: [CardMenuComponent, InformacionesComponent],
	templateUrl: './secretarias-reuniones.component.html',
	styleUrl: './secretarias-reuniones.component.scss'
})
export default class SecretariasReunionesComponent {
	private readonly router = inject(Router);

	public tag = '20241210';
	navigateTo(page: string): void {
		this.router.navigate([page]);
	}

	// addCom(): void {
	// 	this.router.navigateByUrl('addCom/' + this.tag);
	// }
}
