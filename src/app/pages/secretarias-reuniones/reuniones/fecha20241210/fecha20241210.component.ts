import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { InformacionesComponent } from '@app/commons/components/informaciones/informaciones.component';

@Component({
	selector: 'app-fecha20241210',
	imports: [InformacionesComponent],
	templateUrl: './fecha20241210.component.html',
	styleUrl: './fecha20241210.component.scss'
})
export default class Fecha20241210Component {
	private readonly router = inject(Router);
	public tag = '20241210';

	addCom(): void {
		this.router.navigateByUrl('addCom/' + this.tag);
	}
}
