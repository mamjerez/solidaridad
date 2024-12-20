import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '@services/supabase.service';

interface IAsociaciones {
	id: number;
	created_at: string; // Asumiendo que siempre recibes la fecha como cadena
	nombre: string;
	is_activa: boolean;
	rma: number;
	presidente: string;
	sede: string;
	barrio: string | null; // 'null' explicitado como posible valor
	telefono: string | null;
	telefono_representante: string | null;
	contacto: string;
	email: string | null;
	email1: string | null;
	distrito: string;
	tag: string;
	activa: boolean;
	id_federacion: string;
	solidaridad: boolean;
	cuota2023: boolean;
	cuota2024: boolean;
	NIF: string;
}

@Component({
	selector: 'app-datos-asociacion',
	standalone: true,
	imports: [],
	templateUrl: './datos-asociacion.component.html',
	styleUrl: './datos-asociacion.component.scss'
})
export class DatosAsociacionComponent implements OnInit {
	private _router = inject(Router);
	private _supabaseService = inject(SupabaseService);
	public data: IAsociaciones = null;
	public datosAsociacion: any = null;
	public sede: string;
	public presidente: string;
	public telefonoPresidente: string;
	public email: string;

	constructor() {
		// Hay que hacerlo en el constructor de lo contrario no funciona
		const navigation = this._router.getCurrentNavigation();
		this.data = navigation?.extras.state?.['data'];
	}

	ngOnInit(): void {
		if (this.data) {
			this.fetchDatosAsociacion(this.data.tag);
		} else {
			console.error('No se recibieron datos de la asociación.');
			this._router.navigate(['/asociaciones']);
		}
	}

	async fetchDatosAsociacion(tag: string): Promise<void> {
		this.datosAsociacion = await this._supabaseService.fetchDataByTag('solidaridad_asociaciones', tag);
		this.sede = this.datosAsociacion[0].sede;
		this.presidente = this.datosAsociacion[0].presidente;
		this.telefonoPresidente = this.datosAsociacion[0].telefono_representante;
		this.email = this.datosAsociacion[0].email;
	}
}
