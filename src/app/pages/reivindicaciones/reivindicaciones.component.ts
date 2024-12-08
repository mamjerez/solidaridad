import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';
@Component({
	selector: 'app-reivindicaciones',
	standalone: true,
	imports: [CardMenuComponent],

	templateUrl: './reivindicaciones.component.html',
	styleUrl: './reivindicaciones.component.scss'
})
export default class ReivindicacionesComponent {
	private _router = inject(Router);
	public rutaBase = 'https://cswdadlxiubwdzvqzywc.supabase.co/storage/v1/object/public/solidaridad/';

	navigateTo(tag: string) {
		if (tag.startsWith('http')) {
			window.open(tag, '_blank');
		} else {
			const URL = `reivindicaciones/${tag}`;
			this._router.navigateByUrl(URL);
		}
	}
}
