import { Component, input } from '@angular/core';

@Component({
	selector: 'app-card-menu',
	templateUrl: './card-menu.component.html',
	styleUrls: ['./card-menu.component.scss']
})
export class CardMenuComponent {
	readonly rutaImagen = input<string>(undefined);
	readonly titulo = input<string>(undefined);

	isSvg(ruta: string | null): boolean {
		return ruta?.toLowerCase().endsWith('.svg') ?? false;
	}
}
