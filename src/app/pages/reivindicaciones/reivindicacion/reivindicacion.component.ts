import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import InformacionesComponent from '@app/commons/components/informaciones/informaciones.component';
import { SupabaseService } from '@services/supabase.service';
// import { Location } from '@angular/common';

interface IReivindicacion {
	id: number;
	tag: string;
	titulo: string;
	url_img: string;
	etiqueta_coordinador: string;
	coordinador: string;
	tipo: string;
}

@Component({
	selector: 'app-limpieza-viaria',
	imports: [InformacionesComponent],
	templateUrl: './reivindicacion.component.html',
	styleUrl: './reivindicacion.component.scss'
})
export default class LimpiezaViariaComponent implements OnInit {
	private readonly _supabaseService = inject(SupabaseService);
	private readonly router = inject(Router);
	// private readonly _location = inject(Location);
	private _route = inject(ActivatedRoute);

	public tag: string;
	public reivindicacion: IReivindicacion;

	constructor() {
		// si no se hace en el constructor no funciona
		// const path = this._location.path();
		// const segments = path.split('/');
		// this.tag = segments[segments.length - 1];
		// console.log('tag', this.tag);
	}

	ngOnInit(): void {
		this._route.paramMap.subscribe((params) => {
			this.tag = params.get('tag'); // 'tag' es el nombre del parámetro definido en la ruta
			console.log('Path', this.tag);
		});
		this.fecthData();
	}

	async fecthData() {
		this.reivindicacion = await this._supabaseService.fetchDataByTag('solidaridad_reivindicaciones', this.tag);
	}

	addCom(): void {
		console.log(this.tag);
		this.router.navigateByUrl('addCom/' + this.tag);
	}
}
