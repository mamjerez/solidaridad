import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { GaleriaFotosComponent } from '@app/commons/components/galeria-fotos/galeria-fotos.component';

import { IsAdminService } from '@services/isAdmin.service';

@Component({
	selector: 'app-personas',
	imports: [GaleriaFotosComponent],
	templateUrl: './personas.component.html',
	styleUrl: './personas.component.scss'
})
export default class PersonasComponent implements OnInit {
	private readonly _location = inject(Location);
	private readonly _router = inject(Router);
	private readonly _isAdminService = inject(IsAdminService);
	public isAdmin: boolean;
	public data: any;
	public tag = '';

	constructor() {
		// Hay que hacerlo en el constructor de lo contrario no funciona
		const navigation = this._router.getCurrentNavigation();
		this.data = navigation?.extras.state?.['data'];
		this.tag = this.data.tag + this.data.asociacion;
	}

	ngOnInit(): void {
		this._isAdminService.isAdmin$.subscribe((value) => {
			this.isAdmin = value;
		});
	}

	volver(): void {
		this._location.back();
	}

	addFoto(): void {
		this._router.navigateByUrl('addFoto/' + this.tag);
	}
}
