import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '@environments/environment';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';
import ComentariosComponent from '@app/commons/components/level/comentarios/comentarios.component';
import DocumentosComponent from '@app/commons/components/level/documentos/documentos.component';
import NoticiasComponent from '@app/commons/components/level/noticias/noticias.component';

import { GetNewsComsDocs } from '@services/getNewsComsDocs.service';
import { SupabaseService } from '@services/supabase.service';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { IMenuItem } from '@interfaces/menu.interface';
import { INew } from '@interfaces/new.interface';
@Component({
	selector: 'app-level2',
	standalone: true,
	imports: [CardMenuComponent, NoticiasComponent, DocumentosComponent, ComentariosComponent],
	templateUrl: './level2.component.html'
})
export default class Level2Component implements OnInit {
	@Input() tag: string;
	private _supabaseService = inject(SupabaseService);
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

		// [this.news, this.coms, this.docs] = await this._getNewsComsDocs.fetchDataFromSupabase(this.tag);
	}

	createCardMenu(item: IMenuItem) {
		const URL = item.isLastLevel ? 'levelLast/' + item.tag : 'level3/' + item.tag;

		return {
			...item,
			funcion: () => {
				this._router.navigateByUrl(URL);
			}
		};
	}
}
