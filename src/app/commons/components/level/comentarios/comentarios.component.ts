import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
	selector: 'app-comentarios',
	imports: [CommonModule],
	templateUrl: './comentarios.component.html'
})
export default class ComentariosComponent {
	readonly coms = input<any[]>(undefined);
	public canViewConfidencial = false;

	admin(): void {
		this.canViewConfidencial = !this.canViewConfidencial;
	}
}
