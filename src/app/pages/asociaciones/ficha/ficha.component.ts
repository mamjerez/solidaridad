import { Component, OnInit, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import BotonesAddComponent from '@app/commons/components/botones-add/botones-add.component';
import CargosComponent from '../cargos/cargos.component';
import ComentariosComponent from '@app/commons/components/comentarios/comentarios.component';
import DocumentosComponent from '@app/commons/components/documentos/documentos.component';
import GestionesComponent from '@app/commons/components/gestiones/gestiones.component';
import NoticiasComponent from '@app/commons/components/noticias/noticias.component';

import { GetNewsComsDocs } from '@services/getNewsComsDocs.service';
import { SupabaseService } from '@services/supabase.service';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';
import { IGestion } from '@interfaces/gestion.interface';
import { ICargo } from '@interfaces/cargo.interface';

// interface IAsociaciones {
// 	id: number;
// 	created_at: string; // Asumiendo que siempre recibes la fecha como cadena
// 	nombre: string;
// 	is_activa: boolean;
// 	rma: number;
// 	presidente: string;
// 	sede: string;
// 	barrio: string | null;
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
	selector: 'app-ficha',
	imports: [
		NgClass,
		ComentariosComponent,
		DocumentosComponent,
		GestionesComponent,
		NoticiasComponent,
		CargosComponent,
		BotonesAddComponent
	],
	templateUrl: './ficha.component.html',
	styleUrl: './ficha.component.scss'
})
export default class FichaComponent implements OnInit {
	private readonly _supabaseService = inject(SupabaseService);
	// private _router = inject(Router);
	private readonly _route = inject(ActivatedRoute);
	private _getNewsComsDocs = inject(GetNewsComsDocs);
	private _idAsociacion: string;
	public activeTab = 1;
	public news: INew[] = [];
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public gestiones: IGestion[] = [];
	// public data: IAsociaciones = null;
	public cargos: ICargo[] = [];
	public datosAsociacion: any[] = [];
	public datosFederacion: any[] = [];
	public nombreFederacion: string;
	public tag = '';
	public isAsociacion: boolean;
	public avatarUrl: string = '';

	// constructor() {
	// 	// Hay que hacerlo en el constructor de lo contrario no funciona
	// 	const navigation = this._router.getCurrentNavigation();
	// 	this.data = navigation?.extras.state?.['data'];
	// 	this.tag = this.data.id.toString();
	// 	this._idAsociacion = this.data.id;
	// 	console.log(this._idAsociacion);
	// }

	ngOnInit(): void {
		this._idAsociacion = this._route.snapshot.paramMap.get('id');
		this.completaDatosAsociacion(this._idAsociacion);
		this.completaCargos();
		this.fetchData();
		this.completaFederacion();
	}

	async completaDatosAsociacion(id: string) {
		this.datosAsociacion = await this._supabaseService.fetchDataAsociacionesById(id);
		this.tag = this.datosAsociacion[0].id;
	}

	async fetchData() {
		[this.news, this.coms, this.docs, this.gestiones] = await this._getNewsComsDocs.fetchDataFromSupabase(
			this._idAsociacion
		);
	}

	selectTab(tabIndex: number) {
		this.activeTab = tabIndex;
	}

	getCuotaClass(cuota: boolean): string {
		return cuota ? 'pagada-style' : 'no-pagada-style';
	}

	async completaCargos() {
		this.cargos = await this._supabaseService.fetchDataFromViewAsociaciones(
			'view_solidaridad_asociaciones_cargos3',
			'id_asociacion',
			this._idAsociacion
		);
	}

	async completaFederacion() {
		this.datosFederacion = await this._supabaseService.fetchDataFromViewAsociaciones(
			'view_solidaridad_federacion',
			'id_asociacion',
			this._idAsociacion
		);
		this.nombreFederacion = this.datosFederacion[0].nombre_federacion;
	}

	printComponent() {
		const printContent = document.getElementById('print-section');
		const WindowPrt = window.open('', '', 'width=900,height=650');
		WindowPrt.document.write(printContent.innerHTML);
		WindowPrt.document.close();
		WindowPrt.focus();
		WindowPrt.print();
		WindowPrt.close();
	}
}
