import { Component, OnInit, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import NoticiasComponent from '@app/commons/components/level/noticias/noticias.component';
import ComentariosComponent from '@app/commons/components/level/comentarios/comentarios.component';
import DocumentosComponent from '@app/commons/components/level/documentos/documentos.component';
import GestionesComponent from '@app/commons/components/level/gestiones/gestiones/gestiones.component';
import CargosComponent from '../cargos/cargos.component';
import { GetNewsComsDocs } from '@services/getNewsComsDocs.service';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';
import { IGestion } from '@interfaces/gestion.interface';

import { SupabaseService } from '@services/supabase.service';
import { SocialMediaComponent } from '@app/commons/components/social-media/social-media.component';

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
}

interface ICargo {
	persona_id: number;
	email: string | null;
	telefono: string | null;
	nombre: string;
	apellido1: string;
	apellido2: string;
	nombre_cargo: string;
	id_entidad: number;
	nombre_asociacion: string;
}

@Component({
	selector: 'app-ficha',
	standalone: true,
	imports: [
		NgClass,
		FormsModule,
		ReactiveFormsModule,
		ComentariosComponent,
		DocumentosComponent,
		NoticiasComponent,
		GestionesComponent,
		CargosComponent,
		SocialMediaComponent
	],
	templateUrl: './ficha.component.html',
	styleUrl: './ficha.component.scss'
})
export default class FichaComponent implements OnInit {
	private readonly _supabaseService = inject(SupabaseService);
	private _router = inject(Router);
	private _getNewsComsDocs = inject(GetNewsComsDocs);
	private _formBuilder = inject(FormBuilder);
	asociacionForm: FormGroup;
	activeTab = 1;
	public news: INew[] = [];
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public gestiones: IGestion[] = [];
	public data: IAsociaciones = null;
	public cargos: ICargo[] = [];

	constructor() {
		// Hay que hacerlo en el constructor de lo contrario no funciona
		const navigation = this._router.getCurrentNavigation();
		this.data = navigation?.extras.state?.['data'];
	}

	ngOnInit(): void {
		this.completaCargos();
		this.fetchData();

		this.asociacionForm = this._formBuilder.group({
			nombre: [null],
			is_activa: [this.data.is_activa],
			rma: [null],
			sede: [null],
			barrio: [null],
			federacion: [this.data.id_federacion],
			distrito: [null]
		});
	}

	async fetchData() {
		console.log('this.data.id', this.data.id);
		[this.news, this.coms, this.docs, this.gestiones] = await this._getNewsComsDocs.fetchDataFromSupabase(
			this.data.id.toString()
		);
		console.log('this.news', this.news);
		console.log('this.coms', this.coms);
		console.log('this.docs', this.docs);
		console.log('this.gestiones', this.gestiones);
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
			this.data.id
		);
	}
}