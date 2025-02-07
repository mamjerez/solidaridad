import { Component, inject, OnInit, input } from '@angular/core';

import ComentariosComponent from '../comentarios/comentarios.component';
import DocumentosComponent from '../documentos/documentos.component';
import NoticiasComponent from '../noticias/noticias.component';

import { GetNewsComsDocs } from '@services/getNewsComsDocs.service';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';
import { IGestion } from '@interfaces/gestion.interface';

@Component({
	selector: 'app-informaciones',
	imports: [NoticiasComponent, DocumentosComponent, ComentariosComponent],
	templateUrl: './informaciones.component.html',
	styleUrl: './informaciones.component.scss'
})
export default class InformacionesComponent implements OnInit {
	readonly tag = input.required<string>();
	private readonly _getNewsComsDocs = inject(GetNewsComsDocs);
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];
	public gestiones: IGestion[] = [];
	public has_noticias = true;

	async ngOnInit() {
		const [newsComsDocs] = await Promise.all([this._getNewsComsDocs.fetchDataFromSupabase(this.tag())]);
		[this.news, this.coms, this.docs] = newsComsDocs;
		if (this.tag().startsWith('Fecha')) {
			this.has_noticias = false;
		}
	}
}
