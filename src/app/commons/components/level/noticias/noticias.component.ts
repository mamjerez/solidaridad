import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
	selector: 'app-noticias',
	imports: [CommonModule],
	templateUrl: './noticias.component.html'
})
export default class NoticiasComponent {
	readonly news = input<any[]>(undefined);
}
