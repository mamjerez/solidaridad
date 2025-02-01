import { Component, input } from '@angular/core';

import { CustomDatePipe } from '@app/commons/pipes/custom-date.pipe';

@Component({
	selector: 'app-comentarios',
	imports: [CustomDatePipe],
	templateUrl: './comentarios.component.html'
})
export default class ComentariosComponent {
	readonly coms = input<any[]>(undefined);
	public canViewConfidencial = false;

	admin(): void {
		this.canViewConfidencial = !this.canViewConfidencial;
	}

	handleLinkClick(url: string, event: MouseEvent): void {
		// event.preventDefault(); // Prevenir la navegación por defecto

		window.open(url, '_blank', 'noopener,noreferrer');
	}
}
