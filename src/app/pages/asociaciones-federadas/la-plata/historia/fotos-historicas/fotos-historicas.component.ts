import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';

import { GaleriaFotosComponent } from '@app/commons/components/galeria-fotos/galeria-fotos.component';

@Component({
	selector: 'app-fotos-historicas',
	standalone: true,
	imports: [GaleriaFotosComponent],
	templateUrl: './fotos-historicas.component.html',
	styleUrl: './fotos-historicas.component.scss'
})
export default class FotosHistoricasComponent {
	private readonly _location = inject(Location);
	public tag = 'fotoHistoricaLaPlata';

	volver(): void {
		this._location.back();
	}
}
