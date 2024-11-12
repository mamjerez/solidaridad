import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	standalone: true,
	imports: [RouterOutlet, RouterLink]
})
export class NavbarComponent {
	private _location = inject(Location);

	volver() {
		this._location.back();
	}
}
