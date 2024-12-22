import { Component, input } from '@angular/core';

import { CustomDatePipe } from '@app/commons/pipes/custom-date.pipe';

@Component({
	selector: 'app-gestiones',
	imports: [CustomDatePipe],
	templateUrl: './gestiones.component.html',
	styleUrl: './gestiones.component.scss'
})
export default class GestionesComponent {
	readonly gestiones = input<any[]>(undefined);
	public canViewConfidencial = false;

	admin(): void {
		this.canViewConfidencial = !this.canViewConfidencial;
	}
}
