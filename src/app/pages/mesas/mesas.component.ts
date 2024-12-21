import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

@Component({
	selector: 'app-mesas',

	imports: [CardMenuComponent],
	templateUrl: './mesas.component.html',
	styleUrl: './mesas.component.scss'
})
export default class MesasComponent {
	private _router = inject(Router);

	navigateTo(path: string) {
		if (path.startsWith('http')) {
			window.open(path, '_blank');
		} else {
			this._router.navigate([path]);
		}
	}
}
