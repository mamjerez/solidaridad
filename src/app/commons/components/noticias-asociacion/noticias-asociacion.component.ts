import { Component, input } from '@angular/core';

import { CustomDatePipe } from '@app/commons/pipes/custom-date.pipe';

@Component({
	selector: 'app-noticias-asociacion',
	imports: [CustomDatePipe],
	templateUrl: './noticias-asociacion.component.html',
	styleUrl: './noticias-asociacion.component.scss'
})
export class NoticiasAsociacionComponent {
	readonly newsAsociacion = input<any[]>(undefined);
}
