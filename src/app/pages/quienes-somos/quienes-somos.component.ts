import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-quienes-somos',
	templateUrl: './quienes-somos.component.html',
	styleUrl: './quienes-somos.component.scss'
})
export default class QuienesSomosComponent {
	private _router = inject(Router);

	navigateTo(path: string) {
		this._router.navigate([path]);
	}
}
