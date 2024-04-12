import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '@environments/environment';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';
import NoticiasComponent from '@app/commons/components/level/noticias/noticias.component';
import ComentariosComponent from '@app/commons/components/level/comentarios/comentarios.component';
import DocumentosComponent from '@app/commons/components/level/documentos/documentos.component';

import { EnsureTitleService } from '@services/ensureTitle.service';
import { SupabaseService } from '@services/supabase.service';
import { GetNewsComsDocs } from '@services/getNewsComsDocs.service';

import { IMenuItem } from '@interfaces/menu.interface';
import { INew } from '@interfaces/new.interface';
import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
@Component({
	selector: 'app-level2',
	standalone: true,
	imports: [CardMenuComponent, NoticiasComponent, DocumentosComponent, ComentariosComponent],
	templateUrl: './level2.component.html'
})
export default class Level2Component implements OnInit {
	@Input() tag: string;
	private _supabaseService = inject(SupabaseService);
	private _ensureTitleService = inject(EnsureTitleService);
	private _router = inject(Router);
	private _getNewsComsDocs = inject(GetNewsComsDocs);
	public menuOptions: IMenuItem[] = [];
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];
	public title: string;
	public pathImg = environment.pathImgSupabase;
	public subTag = '';

	async ngOnInit() {
		this.subTag = this.tag.substring(0, 8);
		const data = await this._supabaseService.fetchDataByLevel('level2', this.tag);
		this.menuOptions = data.map((item: IMenuItem) => {
			const modifiedItem = {
				...item,
				rutaImagen: environment.pathImgSupabase + item.tag + '.jpg'
			};
			return this.createCardMenu(modifiedItem);
		});

		await this.ensureTitle();

		// [this.news, this.coms, this.docs] = await this._getNewsComsDocs.fetchDataFromSupabase(this.tag);
	}

	createCardMenu(item: IMenuItem) {
		let URL = item.isLastLevel ? 'levelLast/' + item.tag : 'level3/' + item.tag;

		switch (item.tag) {
			case 'retribuciones2022':
				URL = 'retribuciones2022';
				break;
			case 'rpt':
				URL = 'rpt';
				break;
			case 'organigramaPolitico':
				URL = 'organigramaPolitico';
				break;
			case 'organigramaOrganizativo':
				URL = 'organigramaOrganizativo';
				break;
			case 'subvencionesDiputacion':
				URL = 'subvencionesDiputacion';
				break;
		}

		return {
			...item,
			funcion: () => {
				this._router.navigateByUrl(URL);
			}
		};
	}

	async ensureTitle() {
		if (!this.title) {
			this.title = await this._ensureTitleService.ensureTitle(this.tag);
		}
	}
}
