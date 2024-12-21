import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { InformacionesComponent } from '@app/commons/components/informaciones/informaciones.component';

@Component({
	selector: 'app-mayores',

	imports: [InformacionesComponent],
	templateUrl: './mesa-mayores.component.html',
	styleUrl: './mesa-mayores.component.scss'
})
export default class MesaMayoresComponent {
	private readonly router = inject(Router);

	public tag = 'mesaTurismo';

	addCom(): void {
		this.router.navigateByUrl('addCom/' + this.tag);
	}
}
