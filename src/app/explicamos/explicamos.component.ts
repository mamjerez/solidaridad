import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-explicamos',
	templateUrl: './explicamos.component.html',
	styleUrls: ['./explicamos.component.scss'],
	standalone: true
})
export default class ExplicamosComponent {
	private _router = inject(Router);
}
