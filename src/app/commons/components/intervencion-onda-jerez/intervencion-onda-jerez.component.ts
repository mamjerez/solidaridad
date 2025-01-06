import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

@Component({
	selector: 'app-intervencion-onda-jerez',
	imports: [CardMenuComponent],
	templateUrl: './intervencion-onda-jerez.component.html',
	styleUrl: './intervencion-onda-jerez.component.scss'
})
export default class IntervencionOndaJerezComponent {
	// public readonly titulo = input<string>(undefined);
	// readonly rutaDocumento = input<string>(undefined);
	// readonly rutaFoto = input<string>(undefined);
	// readonly rutaAudio = input<string>(undefined);

	public titulo: string;
	public rutaDocumento: string;
	public rutaFoto: string;
	public rutaAudio: string;

	private readonly _router = inject(Router);
	private readonly _location = inject(Location);
	constructor() {
		// Hay que hacerlo en el constructor de lo contrario no funciona
		const navigation = this._router.getCurrentNavigation();
		console.log(navigation);
		this.titulo = navigation?.extras.state?.['titulo'];
		console.log(this.titulo);
		this.rutaDocumento = navigation?.extras.state?.['rutaDocumento'];
		console.log(this.rutaDocumento);
		this.rutaFoto = navigation?.extras.state?.['rutaFoto'];
		console.log(this.rutaFoto);
		this.rutaAudio = navigation?.extras.state?.['rutaAudio'];
		console.log(this.rutaAudio);
	}

	navigateTo(url: string): void {
		window.open(url, '_blank');
	}

	volver(): void {
		this._location.back();
	}
}
