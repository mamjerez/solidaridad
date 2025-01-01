import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { ActivatedRoute, Router } from '@angular/router';

import { SupabaseService } from '@services/supabase.service';

// interface IAsociaciones {
// 	id: number;
// 	created_at: string; // Asumiendo que siempre recibes la fecha como cadena
// 	nombre: string;
// 	is_activa: boolean;
// 	rma: number;
// 	presidente: string;
// 	sede: string;
// 	barrio: string | null; // 'null' explicitado como posible valor
// 	telefono: string | null;
// 	telefono_representante: string | null;
// 	contacto: string;
// 	email: string | null;
// 	email1: string | null;
// 	distrito: string;
// 	tag: string;
// 	activa: boolean;
// 	id_federacion: string;
// 	solidaridad: boolean;
// 	cuota2023: boolean;
// 	cuota2024: boolean;
// 	NIF: string;
// }

@Component({
	selector: 'app-datos-asociacion',
	templateUrl: './datos-asociacion.component.html',
	styleUrl: './datos-asociacion.component.scss'
})
export class DatosAsociacionComponent implements OnInit {
	// private _router = inject(Router);
	// public data: IAsociaciones = null;
	// public datosAsociacion: any = null;
	private _supabaseService = inject(SupabaseService);
	private readonly _route = inject(ActivatedRoute);
	public barrio: string;
	public sede: string;
	public presidente: string;
	public telefonoPresidente: string;
	public email: string;
	public facebook: string;
	public tag = null;

	constructor() {
		// Hay que hacerlo en el constructor de lo contrario no funciona
		// const navigation = this._router.getCurrentNavigation();
		// this.data = navigation?.extras.state?.['data'];

		this.tag = this._route.snapshot.paramMap.get('tag');
	}

	ngOnInit(): void {
		// if (this.data) {
		this.fetchDatosAsociacion(this.tag);
		// } else {
		// 	console.error('No se recibieron datos de la asociación.');
		// 	this._router.navigate(['/asociaciones']);
		// }
	}

	async fetchDatosAsociacion(tag: string): Promise<void> {
		const datosAsociacion = await this._supabaseService.fetchDataByTag('solidaridad_asociaciones', tag);
		this.barrio = datosAsociacion[0].barrio;
		this.sede = datosAsociacion[0].sede;
		this.presidente = datosAsociacion[0].presidente;
		this.telefonoPresidente = datosAsociacion[0].telefono_representante;
		this.email = datosAsociacion[0].email;
		this.facebook = datosAsociacion[0].facebook;
	}
}
