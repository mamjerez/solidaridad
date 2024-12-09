import { Component, inject, Input, input, OnInit } from '@angular/core';

import ComentariosComponent from '@app/commons/components/comentarios/comentarios.component';
import DocumentosComponent from '@app/commons/components/documentos/documentos.component';
import NoticiasComponent from '@app/commons/components/noticias/noticias.component';

import { GetNewsComsDocs } from '@services/getNewsComsDocs.service';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';
import { IGestion } from '@interfaces/gestion.interface';

@Component({
	selector: 'app-informaciones',
	standalone: true,
	imports: [NoticiasComponent, DocumentosComponent, ComentariosComponent],
	templateUrl: './informaciones.component.html',
	styleUrl: './informaciones.component.scss'
})
export class InformacionesComponent implements OnInit {
	@Input() tag: string;
	// tag = input.required<string>();

	private readonly _getNewsComsDocs = inject(GetNewsComsDocs);

	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];
	public gestiones: IGestion[] = [];

	async ngOnInit() {
		console.log('Tag', this.tag);

		const [newsComsDocs] = await Promise.all([this._getNewsComsDocs.fetchDataFromSupabase(this.tag)]);
		// [this.news, this.coms, this.docs, this.gestiones] = await this._getNewsComsDocs.fetchDatPlataformas('astaRegia');
		// const [newsComsDocs] = await Promise.all([this._getNewsComsDocs.fetchDatPlataformas('this.tag')]);

		[this.news, this.coms, this.docs] = newsComsDocs;
		console.log('News', this.news);
		console.log('Coms', this.coms);
		console.log('docs', this.docs);
	}
}
