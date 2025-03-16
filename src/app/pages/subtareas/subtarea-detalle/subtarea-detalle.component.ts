import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
import { IsAdminService } from '@services/isAdmin.service';

@Component({
	selector: 'app-subtarea-detalle',
	imports: [
		ReactiveFormsModule,
		ComentariosComponent,
		DocumentosComponent,
		GestionesComponent,
		NoticiasComponent,
		BotonesAddComponent,
		CustomDatePipe
	],
	templateUrl: './subtarea-detalle.component.html',
	styleUrl: './subtarea-detalle.component.scss'
})
export default class SubtareaDetalleComponent implements OnInit {
	private _supabaseService = inject(SupabaseService);
	private _getTareasNewsComsDocs = inject(GetTareasNewsComsDocs);
	private readonly _isAdminService = inject(IsAdminService);
	private _formBuilder = inject(FormBuilder);
	private _router = inject(Router);
	public news: INew[] = [];
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public gestiones: IGestion[] = [];
	public subtareas: any[] = [];
	public subtarea: ITarea;
	public isEditing = false;
	public editForm: FormGroup;
	public isAdmin: boolean;

	constructor() {
		// Hay que hacerlo en el constructor de lo contrario no funciona
		const navigation = this._router.getCurrentNavigation();
		this.subtarea = navigation?.extras.state?.['data'];
		console.log(this.subtarea);
	}

	ngOnInit(): void {
		this.fetchData();
		this.editForm = this._formBuilder.group({
			date: [this.subtarea.date, Validators.required],
			titulo: [this.subtarea.titulo, Validators.required],
			responsable: [this.subtarea.responsable, Validators.required],
			status: [this.subtarea.status, Validators.required],
			tag: [this.subtarea.tag, Validators.required]
		});

		this._isAdminService.isAdmin$.subscribe((value) => {
			this.isAdmin = value;
		});
	}

	async fetchData() {
		[this.news, this.coms, this.docs, this.gestiones, this.subtareas] =
			await this._getTareasNewsComsDocs.fetchDataFromSupabase(this.subtarea.subtag);
		// [this.gestiones] = await this._getTareasNewsComsDocs.fetchDataFromSupabase(this.tarea.tag);
		console.log(this.news, this.coms, this.docs, this.gestiones, this.subtareas);
	}

	toggleEdit() {
		this.isEditing = !this.isEditing;
	}

	async guardar() {
		if (this.editForm.valid) {
			await this._supabaseService.updateRowTarea('solidaridad_subtareas', this.editForm.value, this.subtarea.subtag);
			this.subtarea = this.editForm.value;
			this.toggleEdit();
		}
	}
}
