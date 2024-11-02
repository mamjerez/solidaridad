import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-cargos',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './cargos.component.html'
})
export default class CargosComponent {
	// TODO: Typar
	@Input() cargos: any[];

	public canViewConfidencial = false;

	admin(): void {
		this.canViewConfidencial = !this.canViewConfidencial;
	}
}
