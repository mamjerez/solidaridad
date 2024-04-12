import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '@environments/environment';

import ComentariosComponent from '@commons/components/level/comentarios/comentarios.component';
import DataGeneralComponent from '@commons/components/level/data-general/data-general.component';
import DocumentosComponent from '@commons/components/level/documentos/documentos.component';
import EstadoLicitacionComponent from '@commons/components/level/estado-licitacion/estado-licitacion.component';
import NoticiasComponent from '@commons/components/level/noticias/noticias.component';
import SeguimientoSubvencionComponent from '@commons/components/level/seguimiento-subvencion/seguimiento-subvencion.component';

import { SupabaseService } from '@services/supabase.service';
import { EnsureTitleService } from '@services/ensureTitle.service';
import { GetNewsComsDocs } from '@services/getNewsComsDocs.service';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';
import { IStep } from '@interfaces/step.interface';
import { first } from 'rxjs';

interface IOption {
	data: string;
	value: string;
	URL?: string;
}

interface IStepSubvencion {
	descripcion: string;
	observaciones: string;
	cuantia: string;
	isFinish?: string;
}

interface IBarrio {
	data: string;
	value: string;
	URL?: string;
}

@Component({
	selector: 'app-level-last',
	standalone: true,
	imports: [
		EstadoLicitacionComponent,
		DataGeneralComponent,
		SeguimientoSubvencionComponent,
		DocumentosComponent,
		ComentariosComponent,
		NoticiasComponent
	],
	templateUrl: './level-last.component.html'
})
export default class LevelLastComponent implements OnInit {
	@Input() tag: string;
	private _ensureTitleService = inject(EnsureTitleService);
	private _supabaseService = inject(SupabaseService);
	private _activatedRoute = inject(ActivatedRoute);
	private _router = inject(Router);
	private _getNewsComsDocs = inject(GetNewsComsDocs);
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];
	public data: IOption[] = [];
	public steps: IStep[] = [];
	public barrios: IBarrio[] = [];
	public stepsSubvencion: IStepSubvencion[] = [];
	public imgURL: string;
	public descripcion: string;
	public isLicitacion = false;
	public title: string;
	public gauge = environment.pathImgSupabase + 'gauge.jpg';
	public deudaTotalImgURL = `${environment.pathImgSupabase}/2023.07.28.jpg`;
	public deudaVivaImgURL = `${environment.pathImgSupabase}/deudaVivaActual.jpg`;
	public pmpURL = environment.pathImgSupabase + 'pmpActual.jpg';
	public opaURL = environment.pathImgSupabase + 'opaActual.jpg';
	public path: string;
	public subTag = '';
	public pathImg = environment.pathImgSupabase;

	ngOnInit() {
		this.subTag = this.tag.substring(0, 5);
		const urlSegments = this._router.url.split('/');
		// ¿Es ruta con parametro? Por ejemplo: path: 'licitaciones/:tag',
		if (urlSegments.length > 2) {
			this._activatedRoute.params.pipe(first()).subscribe(async ({ tag }) => {
				this.path = urlSegments[1];
				this.tag = tag;
				this.isLicitacion = this.path === 'licitaciones';
				if (this.isLicitacion) {
					this.imgURL = `${environment.pathImgSupabase}${this.tag}.jpg`;
				}
			});
		}
		this.fetchDataFromSupabase(this.tag, this.path);
	}

	async fetchDataFromSupabase(tag: string, path: string) {
		if (!this.title) {
			this.title = await this._ensureTitleService.ensureTitle(this.tag);
		}

		if (path === 'licitaciones') {
			try {
				this.steps = await this._supabaseService.fetchDataByTagOrder('steps', tag, true);
			} catch (error) {
				console.error('Error fetching data:', error);
			}

			try {
				const data1 = await this._supabaseService.fetchDataByTag('licitaciones', tag);
				// TODO: crear view en Supabase para hacerlo en ella
				// Lo hago desde este código para evitar problemas con la asignación de nombres en la view con SQL.
				// Ademas que hago la ordenación a la vez de los campos en el orden que quiero que aparezcan en la tabla

				const keyMap = new Map([
					['expediente', 'Expediente'],
					['descripcion', 'Descripción'],
					['codigo_cpv', 'Código CPV'],
					['url_plataforma', 'url Plataforma Contratación'],
					['tipo_contrato', 'Tipo de Contrato'],
					['procedimiento_contratacion', 'Procedimiento'],
					['tipo_tramitación', 'Tramitación'],
					['sistema_contratacion', 'Sistema de contratación'],
					['presupuesto_base_sin_impuestos', 'Presupuesto base sin impuestos'],
					['presupuesto_base_licitación_con_impuestos', 'Presupuesto base licitación con impuestos'],
					['plazo_ejecución', 'Plazo ejecución'],
					['licitadores_presentados', 'Licitadores presentados'],
					['adjudicatario', 'Adjudicatario'],
					['cif_adjudicatario', 'CIF adjudicatario'],
					['url_adjudicatario', 'url Información adjudicatario'],
					['importe_adjudicación_sin_impuestos', 'Importe adjudicación sin impuestos'],
					['importe_adjudicación_con_impuestos', 'Importe adjudicación con impuestos'],
					['tipo_financiacion', 'Tipo financiación'],
					['valor_estimado_contrato', 'Valor estimado del contrato'],
					['credito_ampara', 'Credito en que se ampara'],
					['organico', 'Orgánico'],
					['programa', 'Programa'],
					['economico', 'Económico'],
					['distrito', 'Distrito'],
					['url_distrito', 'url Distrito'],
					['url_geolocalización', 'url Geolocalización'],
					['duración_contrato', 'Duración contrato'],
					['canon_concesional', 'Canon concesional']
					// ['valor_estimado_contrato', 'Valor estimado'],
					// ['tag', 'tag'],
				]);

				const dataO = data1.flatMap((item) =>
					Array.from(keyMap.keys())
						.filter((key) => item[key] !== null && item[key] !== '')
						.map((key) => ({
							data: keyMap.get(key),
							value: item[key]
						}))
				);
				this.data = dataO;
				const descripcionObj = this.data.find((obj) => obj.data === 'Descripción');
				if (descripcionObj) {
					this.descripcion = descripcionObj.value;
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}

		// [this.news, this.coms, this.docs] = await this._getNewsComsDocs.fetchDataFromSupabase(this.tag);
	}
}
