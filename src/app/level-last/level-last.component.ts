import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '@environments/environment';

import ComentariosComponent from '@commons/components/level/comentarios/comentarios.component';
import DocumentosComponent from '@commons/components/level/documentos/documentos.component';
import NoticiasComponent from '@commons/components/level/noticias/noticias.component';

import { SupabaseService } from '@services/supabase.service';
import { GetNewsComsDocs } from '@services/getNewsComsDocs.service';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';
import { first } from 'rxjs';

interface IOption {
	data: string;
	value: string;
	URL?: string;
}

interface IBarrio {
	data: string;
	value: string;
	URL?: string;
}

@Component({
	selector: 'app-level-last',
	standalone: true,
	imports: [DocumentosComponent, ComentariosComponent, NoticiasComponent],
	templateUrl: './level-last.component.html'
})
export default class LevelLastComponent implements OnInit {
	@Input() tag: string;
	// private _ensureTitleService = inject(EnsureTitleService);
	private _supabaseService = inject(SupabaseService);
	private _activatedRoute = inject(ActivatedRoute);
	private _router = inject(Router);
	private _getNewsComsDocs = inject(GetNewsComsDocs);
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];
	public data: IOption[] = [];
	// public steps: IStep[] = [];
	public barrios: IBarrio[] = [];
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
			// this.title = await this._ensureTitleService.ensureTitle(this.tag);
		}

		// [this.news, this.coms, this.docs] = await this._getNewsComsDocs.fetchDataFromSupabase(this.tag);
	}
}
