import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-noticias-asociacion',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './noticias-asociacion.component.html',
	styleUrl: './noticias-asociacion.component.scss'
})
export class NoticiasAsociacionComponent {
	@Input() newsAsociacion: any[];
}
