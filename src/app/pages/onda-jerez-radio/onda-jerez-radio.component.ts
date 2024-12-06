import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-onda-jerez-radio',
	standalone: true,
	imports: [],
	templateUrl: './onda-jerez-radio.component.html',
	styleUrl: './onda-jerez-radio.component.scss'
})
export default class OndaJerezRadioComponent {
	private readonly _router = inject(Router);

	navigateTo(path: string) {
		this._router.navigate([path]);
	}
}
