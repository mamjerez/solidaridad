import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'app-botones-add',
	standalone: true,
	templateUrl: './botones-add.component.html',
	styleUrl: './botones-add.component.scss'
})
export class BotonesAddComponent {
	tag = input.required<string>();
	private readonly _router = inject(Router);
	private readonly _location = inject(Location);
	public isAdmin = false;

	addNew(): void {
		this._router.navigateByUrl('addNew/' + this.tag());
	}

	addCom(): void {
		this._router.navigateByUrl('addCom/' + this.tag());
	}

	addDoc(): void {
		this._router.navigateByUrl('addDoc/' + this.tag());
	}

	addGes(): void {
		this._router.navigateByUrl('addGestion/' + this.tag());
	}

	volver(): void {
		this._location.back();
	}
}
