import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-asociaciones-federadas',
	standalone: true,
	imports: [],
	templateUrl: './asociaciones-federadas.component.html',
	styleUrl: './asociaciones-federadas.component.scss'
})
export default class AsociacionesFederadasComponent {
	private readonly _router = inject(Router);

	asociaciones = [
		{ nombre: 'San Enrique', ruta: '/sanEnrique' },
		{ nombre: 'Albarizuela', ruta: 'https://albarizuela.org/home' },
		{ nombre: 'La Granja', ruta: '/la-granja' }
	];

	navigateTo(path: string) {
		if (path.startsWith('http')) {
			window.open(path, '_blank');
		} else {
			this._router.navigate([path]);
		}
	}
}
