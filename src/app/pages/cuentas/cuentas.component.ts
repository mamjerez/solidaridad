import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
	selector: 'app-cuentas',
	imports: [],
	templateUrl: './cuentas.component.html',
	styleUrl: './cuentas.component.scss'
})
export default class CuentasComponent {
	private readonly _location = inject(Location);

	volver(): void {
		this._location.back();
	}
}
