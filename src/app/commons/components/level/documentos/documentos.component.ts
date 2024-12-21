import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
	selector: 'app-documentos',
	imports: [CommonModule],
	templateUrl: './documentos.component.html'
})
export default class DocumentosComponent {
	readonly docs = input<any[]>(undefined);
	public canViewConfidencial = false;

	admin(): void {
		this.canViewConfidencial = !this.canViewConfidencial;
	}
}
