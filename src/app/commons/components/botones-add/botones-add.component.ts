import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'app-botones-add',
	standalone: true,
	imports: [],
	templateUrl: './botones-add.component.html',
	styleUrl: './botones-add.component.scss'
})
export class BotonesAddComponent {
	tag = input.required<string>();
	public readonly router = inject(Router);
	private _location = inject(Location);

	public isAdmin = false;

	addNew(): void {
		this.router.navigateByUrl('addNew/' + this.tag());
	}

	addCom(): void {
		this.router.navigateByUrl('addCom/' + this.tag());
	}

	addDoc(): void {
		this.router.navigateByUrl('addDoc/' + this.tag());
	}

	addGes(): void {
		this.router.navigateByUrl('addGestion/' + this.tag());
	}

	volver(): void {
		this._location.back();
	}
}
