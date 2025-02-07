import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import BotonesAddComponent from '@app/commons/components/botones-add/botones-add.component';
import ComentariosComponent from '@app/commons/components/comentarios/comentarios.component';
import DocumentosComponent from '@app/commons/components/documentos/documentos.component';
import GestionesComponent from '@app/commons/components/gestiones/gestiones.component';
import NoticiasComponent from '@app/commons/components/noticias/noticias.component';

import { GetNewsComsDocs } from '@services/getNewsComsDocs.service';
import { SupabaseService } from '@services/supabase.service';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';
import { IGestion } from '@interfaces/gestion.interface';

@Component({
	selector: 'app-a2003',
	imports: [ComentariosComponent, DocumentosComponent, GestionesComponent, NoticiasComponent, BotonesAddComponent],
	templateUrl: './a2003.component.html',
	styleUrl: './a2003.component.scss'
})
export default class A2003Component implements OnInit {
	private readonly router = inject(Router);
	private readonly _supabaseService = inject(SupabaseService);

	private _getNewsComsDocs = inject(GetNewsComsDocs);

	public tag = 'a2003';
	public news: INew[] = [];
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public gestiones: IGestion[] = [];

	ngOnInit(): void {
		this.fetchData();
	}

	async fetchData() {
		[this.news, this.coms, this.docs, this.gestiones] = await this._getNewsComsDocs.fetchDataFromSupabase(this.tag);
	}

	addCom(): void {
		this.router.navigateByUrl('addCom/' + this.tag);
	}
}
