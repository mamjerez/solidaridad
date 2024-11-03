import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
// import { IDoc } from '@interfaces/doc.interface';

@Component({
	selector: 'app-documentos',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './documentos.component.html'
})
export default class DocumentosComponent {
	// TODO: Typar
	@Input() docs: any[];

	public canViewConfidencial = false;

	admin(): void {
		this.canViewConfidencial = !this.canViewConfidencial;
	}
}
