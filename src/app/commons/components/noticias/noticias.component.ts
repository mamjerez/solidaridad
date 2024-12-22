import { Component, input } from '@angular/core';

import { CustomDatePipe } from '@app/commons/pipes/custom-date.pipe';

@Component({
	selector: 'app-noticias',
	imports: [CustomDatePipe],
	templateUrl: './noticias.component.html'
})
export default class NoticiasComponent {
	readonly news = input<any[]>(undefined);
}
