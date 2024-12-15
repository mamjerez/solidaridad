import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-noticias-barrio',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './noticias-barrio.component.html',
	styleUrl: './noticias-barrio.component.scss'
})
export class NoticiasBarrioComponent {
	@Input() newsBarrio: any[];
}
