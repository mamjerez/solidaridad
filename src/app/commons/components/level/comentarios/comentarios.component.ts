import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

// import { ICom } from '@interfaces/com.interface';

@Component({
	selector: 'app-comentarios',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './comentarios.component.html'
})
export default class ComentariosComponent {
	// TODO: Typar
	@Input() coms: any[];
	public canViewConfidencial = false;

	admin(): void {
		this.canViewConfidencial = !this.canViewConfidencial;
	}
}
