import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
	selector: 'app-gestiones',
	imports: [CommonModule],
	templateUrl: './gestiones.component.html',
	styleUrl: './gestiones.component.scss'
})
export default class GestionesComponent {
	readonly gestiones = input<any[]>(undefined);
	public canViewConfidencial = false;

	admin(): void {
		this.canViewConfidencial = !this.canViewConfidencial;
	}
}
