import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-gestiones',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './gestiones.component.html',
	styleUrl: './gestiones.component.scss'
})
export default class GestionesComponent {
	@Input() gestiones: any[];
	public canViewConfidencial = false;

	admin(): void {
		this.canViewConfidencial = !this.canViewConfidencial;
	}
}
