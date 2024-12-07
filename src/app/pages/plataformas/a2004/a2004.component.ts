import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { InformacionesComponent } from '@app/commons/components/informaciones/informaciones.component';

@Component({
	selector: 'app-a2004',
	standalone: true,
	imports: [InformacionesComponent],

	templateUrl: './a2004.component.html',
	styleUrl: './a2004.component.scss'
})
export default class A2004Component {
	private readonly router = inject(Router);

	public tag = 'a2004';

	addCom(): void {
		this.router.navigateByUrl('addCom/' + this.tag);
	}
}
