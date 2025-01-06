import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

@Component({
	selector: 'app-onda-jerez-radio',
	imports: [CardMenuComponent],
	templateUrl: './onda-jerez-radio.component.html',
	styleUrl: './onda-jerez-radio.component.scss'
})
export default class OndaJerezRadioComponent {
	private readonly _router = inject(Router);
	private readonly _location = inject(Location);

	navigateTo(path: string) {
		this._router.navigate([path]);
	}

	navigateToNew(titulo: string, rutaDocumento: string | null, rutaFoto: string, rutaAudio: string) {
		this._router.navigate(['intervencionOndaJerez'], {
			state: {
				titulo,
				rutaDocumento,
				rutaFoto,
				rutaAudio
			}

			// state: {
			// 	titulo: 'Intervención 20/11/2024 Miguel A. Martinez + AVV "La Plata" Jerónimo Grosso',
			// 	rutaDocumento: null,
			// 	rutaFoto: 'https://1drv.ms/i/s!AqUr6AaNBwpDpqYlDcwhKta-6mPLwQ?e=rPKMHr',
			// 	rutaAudio: 'https://1drv.ms/u/s!AqUr6AaNBwpDpqYnKCC0GiI70upD9Q?e=t7w2Ag'
			// }
		});
	}

	volver(): void {
		this._location.back();
	}
}
