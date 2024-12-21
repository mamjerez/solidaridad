import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
	selector: 'app-noticias-barrio',
	imports: [CommonModule],
	templateUrl: './noticias-barrio.component.html',
	styleUrl: './noticias-barrio.component.scss'
})
export class NoticiasBarrioComponent {
	readonly newsBarrio = input<any[]>(undefined);
}
