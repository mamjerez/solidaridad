import { Component, input } from '@angular/core';

@Component({
	selector: 'app-cargos',
	templateUrl: './cargos.component.html'
})
export default class CargosComponent {
	readonly cargos = input<any[]>(undefined);
}
