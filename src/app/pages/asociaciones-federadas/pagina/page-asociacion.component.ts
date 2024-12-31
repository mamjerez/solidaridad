import { BotonesAddComponent } from '@app/commons/components/botones-add/botones-add.component';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';
import { DatosAsociacionComponent } from '@app/commons/components/datos-asociacion/datos-asociacion.component';
import { NoticiasAsociacionComponent } from '@app/commons/components/noticias-asociacion/noticias-asociacion.component';
import { NoticiasBarrioComponent } from '@app/commons/components/noticias-barrio/noticias-barrio.component';
import DocumentosComponent from '@app/commons/components/documentos/documentos.component';
import ComentariosComponent from '@app/commons/components/comentarios/comentarios.component';

import { SupabaseService } from '@services/supabase.service';

import { ICard } from '@interfaces/card.interface';
import { INew } from '@interfaces/new.interface';
import { IDoc } from '@interfaces/doc.interface';
import { ICom } from '@interfaces/com.interface';

@Component({
	selector: 'app-page-asociacion',
	imports: [
		BotonesAddComponent,
		CardMenuComponent,
		NoticiasBarrioComponent,
		NoticiasAsociacionComponent,
		DatosAsociacionComponent,
		DocumentosComponent,
		ComentariosComponent
	],
	templateUrl: './page-asociacion.component.html',
	styleUrl: './page-asociacion.component.scss'
})
export default class PageAsociacionComponent implements OnInit {
	private readonly _supabaseService = inject(SupabaseService);
	private readonly _router = inject(Router);
	private readonly _route = inject(ActivatedRoute);
	private _pathImage = 'https://cswdadlxiubwdzvqzywc.supabase.co/storage/v1/object/public/';
	public cards: ICard[] = [];
	public cardsActividades: ICard[] = [];
	public cardsHistoria: ICard[] = [];
	public newsBarrio: INew[] = [];
	public newsAsociacion: INew[] = [];
	public docs: IDoc[] = [];
	public coms: ICom[] = [];
	public tag = null;
	public data: any;

	constructor() {
		// Hay que hacerlo en el constructor de lo contrario no funciona
		const navigation = this._router.getCurrentNavigation();
		this.data = navigation?.extras.state?.['data'];
		this._pathImage = `${this._pathImage}${this.firstToLowerCase(this.data.tag)}/`;
	}

	ngOnInit() {
		this.createCardProblemas();
		this.createCardActividad();
		this.createCardHistoria();
		this.fetchNews();
		this.fetchDocs();
		this.fetchComs();
	}

	async createCardProblemas() {
		try {
			const data = await this._supabaseService.fetchAsociacionesProblemas(this.data.tag);
			this.cards = data.map((card) => ({
				...card,
				rutaImagen: `${this._pathImage}${card.tag}.jpg`,
				funcion: () => this._router.navigateByUrl('problema', { state: { data: card } })
			}));
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	async createCardActividad() {
		try {
			const data = await this._supabaseService.fetchAsociacionesActividades(this.data.tag);
			this.cardsActividades = data.map((card) => ({
				...card,
				rutaImagen: `${this._pathImage}${card.tag}.jpg`,
				funcion: () => this._router.navigateByUrl('actividad', { state: { data: card } })
			}));
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	async createCardHistoria() {
		try {
			const data = await this._supabaseService.fetchAsociacionesHistoria(this.data.tag);
			this.cardsHistoria = data.map((card) => ({
				...card,
				rutaImagen: `${this._pathImage}${card.tag}.jpg`,
				funcion: () => this._router.navigateByUrl(card.tag, { state: { data: card } })
			}));
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	async fetchNews() {
		// para usar el tag en las news de OCM
		const tagMapping: Record<string, string> = {
			LaPlata: 'barriadaLaPlata',
			SanEnrique: 'barriadaSanEnrique'
		};
		const avv = this.data.tag ? (tagMapping[this.data.tag] ?? null) : null;

		this.newsBarrio = await this._supabaseService.fetchDataByTagOrder('news', avv, false);
		this.newsAsociacion = await this._supabaseService.fetchDataByTagOrder('solidaridad_news', this.data.tag, false);
	}

	async fetchDocs() {
		// para usar el tag en las news de OCM
		const tagMapping: Record<string, string> = {
			LaPlata: 'barriadaLaPlata',
			SanEnrique: 'barriadaSanEnrique'
		};
		const avv = this.data.tag ? (tagMapping[this.data.tag] ?? null) : null;
		this.docs = await this._supabaseService.fetchDataByTagOrder('solidaridad_documentos', avv, false);
	}

	async fetchComs() {
		// para usar el tag en las news de OCM
		const tagMapping: Record<string, string> = {
			LaPlata: 'LaPlata',
			SanEnrique: 'barriadaSanEnrique'
		};
		const avv = this.data.tag ? (tagMapping[this.data.tag] ?? null) : null;
		console.log('avv', avv);

		this.coms = await this._supabaseService.fetchDataByTagOrder('solidaridad_comentarios', avv, false);
	}

	firstToLowerCase(str: string): string {
		if (!str) return str;
		return str.charAt(0).toLowerCase() + str.slice(1);
	}
}
