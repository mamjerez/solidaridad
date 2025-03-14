import { Component, input } from '@angular/core';

import { CustomDatePipe } from '@app/commons/pipes/custom-date.pipe';

@Component({
	selector: 'app-subtareas',
	imports: [CustomDatePipe],
	templateUrl: './subtareas.component.html',
	styleUrl: './subtareas.component.scss'
})
export class SubtareasComponent {
	readonly subtareas = input<any[]>(undefined);
}
