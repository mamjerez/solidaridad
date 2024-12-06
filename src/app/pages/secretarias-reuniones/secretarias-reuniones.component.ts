import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { InformacionesComponent } from '@app/commons/components/informaciones/informaciones.component';

@Component({
	selector: 'app-secretarias-reuniones',
	standalone: true,
	imports: [InformacionesComponent],
	templateUrl: './secretarias-reuniones.component.html',
	styleUrl: './secretarias-reuniones.component.scss'
})
export default class SecretariasReunionesComponent {
	private readonly router = inject(Router);

	public tag = '20241210';

	navigateToPage(): void {
		this.router.navigate(['/Fecha20241210']);
	}

	// addCom(): void {
	// 	this.router.navigateByUrl('addCom/' + this.tag);
	// }
}
