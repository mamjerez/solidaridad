import { Component, input } from '@angular/core';

import { CustomDatePipe } from '@app/commons/pipes/custom-date.pipe';

@Component({
	selector: 'app-noticias-barrio',
	imports: [CustomDatePipe],
	templateUrl: './noticias-barrio.component.html',
	styleUrl: './noticias-barrio.component.scss'
})
export class NoticiasBarrioComponent {
	readonly newsBarrio = input<any[]>(undefined);
}
