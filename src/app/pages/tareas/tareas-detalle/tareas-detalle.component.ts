import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import BotonesAddComponent from '@app/commons/components/botones-add/botones-add.component';
import ComentariosComponent from '@app/commons/components/comentarios/comentarios.component';
import DocumentosComponent from '@app/commons/components/documentos/documentos.component';
import GestionesComponent from '@app/commons/components/gestiones/gestiones.component';
import NoticiasComponent from '@app/commons/components/noticias/noticias.component';
import { CustomDatePipe } from '@app/commons/pipes/custom-date.pipe';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { IGestion } from '@interfaces/gestion.interface';
import { INew } from '@interfaces/new.interface';

import { ITarea } from '@interfaces/tarea.interface';
import { GetTareasNewsComsDocs } from '@services/getTareasNewsComsDocs.service';
import { SupabaseService } from '@services/supabase.service';

@Component({
	selector: 'app-tareas-detalle',
	imports: [
		ComentariosComponent,
		DocumentosComponent,
		GestionesComponent,
		NoticiasComponent,
		BotonesAddComponent,
		CustomDatePipe
	],
	templateUrl: './tareas-detalle.component.html',
	styleUrl: './tareas-detalle.component.scss'
})
export default class TareasDetalleComponent implements OnInit {
	private _supabaseService = inject(SupabaseService);
	private _getTareasNewsComsDocs = inject(GetTareasNewsComsDocs);

	private _router = inject(Router);
	public news: INew[] = [];
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public gestiones: IGestion[] = [];

	public tarea: ITarea;

	constructor() {
		// Hay que hacerlo en el constructor de lo contrario no funciona
		const navigation = this._router.getCurrentNavigation();
		this.tarea = navigation?.extras.state?.['data'];
		console.log(this.tarea);
	}

	ngOnInit(): void {
		this.fetchData();
	}

	async fetchData() {
		// [this.news, this.coms, this.docs, this.gestiones] = await this._getTareasNewsComsDocs.fetchDataFromSupabase(
		[this.gestiones] = await this._getTareasNewsComsDocs.fetchDataFromSupabase(this.tarea.id.toString());
		console.log(this.news, this.coms, this.docs, this.gestiones);
	}
}
