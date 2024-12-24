import { BotonesAddComponent } from '@app/commons/components/botones-add/botones-add.component';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';
import { DatosAsociacionComponent } from '@app/commons/components/datos-asociacion/datos-asociacion.component';
import { NoticiasAsociacionComponent } from '@app/commons/components/noticias-asociacion/noticias-asociacion.component';
import { NoticiasBarrioComponent } from '@app/commons/components/noticias-barrio/noticias-barrio.component';

import { SupabaseService } from '@services/supabase.service';

import { ICard } from '@interfaces/card.interface';
import { INew } from '@interfaces/new.interface';

@Component({
	selector: 'app-page-asociacion',
	imports: [
		BotonesAddComponent,
		CardMenuComponent,
		NoticiasBarrioComponent,
		NoticiasAsociacionComponent,
		DatosAsociacionComponent
	],
	templateUrl: './page-asociacion.component.html',
	styleUrl: './page-asociacion.component.scss'
})
export default class PageAsociacionComponent implements OnInit {
	private readonly _supabaseService = inject(SupabaseService);
	private readonly _router = inject(Router);
	private readonly _route = inject(ActivatedRoute);
	private readonly _pathImage = 'https://cswdadlxiubwdzvqzywc.supabase.co/storage/v1/object/public/laPlata/';
	public cards: ICard[] = [];
	public cardsActividades: ICard[] = [];
	public cardsHistoria: ICard[] = [];
	public newsBarrio: INew[] = [];
	public newsAsociacion: INew[] = [];
	public tag = null;
	public data: any;

	constructor() {
		// Hay que hacerlo en el constructor de lo contrario no funciona
		const navigation = this._router.getCurrentNavigation();
		this.data = navigation?.extras.state?.['data'];
	}

	ngOnInit() {
		this.createCardProblemas();
		this.createCardActividad();
		this.createCardHistoria();
		this.fetchNews();
	}

	async createCardProblemas() {
		try {
			const data = await this._supabaseService.fetchAsociacionesProblemas(this.data.tag);
			this.cards = data.map((card) => ({
				...card,
				rutaImagen: `${this._pathImage}${card.tag}.jpg`,
				// funcion: () => this._router.navigateByUrl(card.tag, { state: { avv: 'laPlata' } })
				// funcion: () => this._router.navigateByUrl('problema', { state: { problema: card.tag } })
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
				// funcion: () => this._router.navigateByUrl(card.tag, { state: { avv: 'laPlata' } })
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
				rutaImagen: `${this._pathImage}${card.tag}${card.asociacion}.jpg`,
				funcion: () => this._router.navigateByUrl(card.tag, { state: { data: card } })
			}));
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	async fetchNews() {
		this.newsBarrio = await this._supabaseService.fetchDataByTagOrder('news', 'barriadaLaPlata', false);
		this.newsAsociacion = await this._supabaseService.fetchDataByTagOrder('solidaridad_news', 'laPlata', false);
	}
}
