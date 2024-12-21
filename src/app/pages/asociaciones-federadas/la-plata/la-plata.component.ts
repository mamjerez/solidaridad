import { BotonesAddComponent } from '@app/commons/components/botones-add/botones-add.component';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';
import { DatosAsociacionComponent } from '@app/commons/components/datos-asociacion/datos-asociacion.component';
import { NoticiasAsociacionComponent } from '@app/commons/components/noticias-asociacion/noticias-asociacion.component';
import { NoticiasBarrioComponent } from '@app/commons/components/noticias-barrio/noticias-barrio.component';
import { ICard } from '@interfaces/card.interface';
import { INew } from '@interfaces/new.interface';
import { SupabaseService } from '@services/supabase.service';

@Component({
	selector: 'app-la-plata',

	imports: [
		BotonesAddComponent,
		CardMenuComponent,
		NoticiasBarrioComponent,
		NoticiasAsociacionComponent,
		DatosAsociacionComponent
	],
	templateUrl: './la-plata.component.html',
	styleUrl: './la-plata.component.scss'
})
export default class LaPlataComponent implements OnInit {
	private readonly _supabaseService = inject(SupabaseService);
	private readonly _router = inject(Router);
	private readonly _pathImage = 'https://cswdadlxiubwdzvqzywc.supabase.co/storage/v1/object/public/laPlata/';
	public cards: ICard[] = [];
	public cardsActividades: ICard[] = [];
	public cardsHistoria: ICard[] = [];
	public newsBarrio: INew[] = [];
	public newsAsociacion: INew[] = [];
	public tag = null;

	ngOnInit() {
		this.createCardMenu();
		this.createCardActividad();
		this.createCardHistoria();
		this.fetchNews();
	}

	async createCardMenu() {
		try {
			const data = await this._supabaseService.fetchDataHomeAVV('laplata_menu_cards');
			this.cards = data.map((card) => ({
				...card,
				rutaImagen: `${this._pathImage}${card.tag}.jpg`,
				funcion: () => this._router.navigateByUrl(card.tag, { state: { avv: 'laPlata' } })
			}));
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	async createCardActividad() {
		try {
			const data = await this._supabaseService.fetchDataHomeAVV('laplata_actividades');
			this.cardsActividades = data.map((card) => ({
				...card,
				rutaImagen: `${this._pathImage}${card.tag}.jpg`,
				funcion: () => this._router.navigateByUrl(card.tag, { state: { avv: 'laPlata' } })
			}));
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	async createCardHistoria() {
		try {
			const data = await this._supabaseService.fetchDataHomeAVV('laplata_historia_cards');
			this.cardsHistoria = data.map((card) => ({
				...card,
				rutaImagen: `${this._pathImage}${card.tag}.jpg`,
				funcion: () => this._router.navigateByUrl(card.tag, { state: { avv: 'laPlata' } })
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
