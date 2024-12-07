import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { InformacionesComponent } from '@app/commons/components/informaciones/informaciones.component';

@Component({
	selector: 'app-asta-regia',
	standalone: true,
	imports: [InformacionesComponent],

	templateUrl: './asta-regia.component.html',
	styleUrl: './asta-regia.component.scss'
})
export default class AstaRegiaComponent {
	private readonly router = inject(Router);

	public tag = 'astaRegia';

	addCom(): void {
		this.router.navigateByUrl('addCom/' + this.tag);
	}
}
