import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

import { CustomDatePipe } from '@app/commons/pipes/custom-date.pipe';

@Component({
	selector: 'app-subtareas',
	imports: [CustomDatePipe],
	templateUrl: './subtareas.component.html',
	styleUrl: './subtareas.component.scss'
})
export class SubtareasComponent {
	readonly subtareas = input<any[]>(undefined);
	private _router = inject(Router);

	openSubtareaDetail(subtarea: any): void {
		console.log(subtarea);

		this._router.navigate(['subtarea_detalle'], { state: { data: subtarea } });
		// this._router.navigate(['subtarea_detalle']);
	}
}
