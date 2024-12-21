import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
	selector: 'app-noticias-asociacion',
	imports: [CommonModule],
	templateUrl: './noticias-asociacion.component.html',
	styleUrl: './noticias-asociacion.component.scss'
})
export class NoticiasAsociacionComponent {
	readonly newsAsociacion = input<any[]>(undefined);
}
