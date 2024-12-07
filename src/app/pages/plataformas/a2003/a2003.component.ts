import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { InformacionesComponent } from '@app/commons/components/informaciones/informaciones.component';

@Component({
	selector: 'app-a2003',
	standalone: true,
	imports: [InformacionesComponent],

	templateUrl: './a2003.component.html',
	styleUrl: './a2003.component.scss'
})
export default class A2003Component {
	private readonly router = inject(Router);

	public tag = 'a2003';

	addCom(): void {
		this.router.navigateByUrl('addCom/' + this.tag);
	}
}
