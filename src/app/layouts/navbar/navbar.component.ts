// import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	standalone: true,
	imports: [RouterLink]
})
export class NavbarComponent {
	// private _location = inject(Location);
	// volver() {
	// 	this._location.back();
	// }
}
