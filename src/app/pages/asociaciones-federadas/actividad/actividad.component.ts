import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-actividad',

	templateUrl: './actividad.component.html',
	styleUrl: './actividad.component.scss'
})
export default class ActividadComponent {
	private readonly _router = inject(Router);
	public data: any;
	private readonly router = inject(Router);
	public tag = '';

	constructor() {
		// Hay que hacerlo en el constructor de lo contrario no funciona
		const navigation = this._router.getCurrentNavigation();
		this.data = navigation?.extras.state?.['data'];
		console.log(this.data);
		this.tag = this.data.tag;
	}
}
