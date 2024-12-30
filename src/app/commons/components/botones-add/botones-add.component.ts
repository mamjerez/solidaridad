import { Component, inject, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { IsAdminService } from '@services/isAdmin.service';

@Component({
	selector: 'app-botones-add',
	templateUrl: './botones-add.component.html',
	styleUrl: './botones-add.component.scss'
})
export class BotonesAddComponent implements OnInit {
	tag = input.required<string>();
	private readonly _router = inject(Router);
	private readonly _location = inject(Location);
	private readonly _isAdminService = inject(IsAdminService);
	public isAdmin: boolean;

	ngOnInit(): void {
		this._isAdminService.isAdmin$.subscribe((value) => {
			this.isAdmin = value;
		});
	}

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

	addCargo(): void {
		this._router.navigateByUrl('addCargo/' + this.tag());
	}

	volver(): void {
		this._location.back();
	}
}
