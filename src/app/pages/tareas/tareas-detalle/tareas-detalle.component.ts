import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import BotonesAddComponent from '@app/commons/components/botones-add/botones-add.component';
import ComentariosComponent from '@app/commons/components/comentarios/comentarios.component';
import DocumentosComponent from '@app/commons/components/documentos/documentos.component';
import GestionesComponent from '@app/commons/components/gestiones/gestiones.component';
import NoticiasComponent from '@app/commons/components/noticias/noticias.component';
import { CustomDatePipe } from '@app/commons/pipes/custom-date.pipe';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { IGestion } from '@interfaces/gestion.interface';
import { INew } from '@interfaces/new.interface';

import { ITarea } from '@interfaces/tarea.interface';
import { GetTareasNewsComsDocs } from '@services/getTareasNewsComsDocs.service';
import { SupabaseService } from '@services/supabase.service';
import { IsAdminService } from '@services/isAdmin.service';
import { SubtareasComponent } from '@app/commons/components/subtareas/subtareas.component';

@Component({
	selector: 'app-tareas-detalle',
	imports: [
		ReactiveFormsModule,
		ComentariosComponent,
		DocumentosComponent,
		GestionesComponent,
		NoticiasComponent,
		BotonesAddComponent,
		CustomDatePipe,
		SubtareasComponent
	],
	templateUrl: './tareas-detalle.component.html',
	styleUrl: './tareas-detalle.component.scss'
})
export default class TareasDetalleComponent implements OnInit {
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
	public tarea: ITarea;
	public isEditing = false;
	public editForm: FormGroup;
	public isAdmin: boolean;

	constructor() {
		// Hay que hacerlo en el constructor de lo contrario no funciona
		const navigation = this._router.getCurrentNavigation();
		this.tarea = navigation?.extras.state?.['data'];
	}

	ngOnInit(): void {
		this.fetchData();
		this.editForm = this._formBuilder.group({
			fecha_inicio: [this.tarea.fecha_inicio, Validators.required],
			titulo: [this.tarea.titulo, Validators.required],
			responsable: [this.tarea.responsable, Validators.required],
			status: [this.tarea.status, Validators.required],
			tag: [this.tarea.tag, Validators.required]
		});

		this._isAdminService.isAdmin$.subscribe((value) => {
			this.isAdmin = value;
		});
	}

	async fetchData() {
		[this.news, this.coms, this.docs, this.gestiones, this.subtareas] =
			await this._getTareasNewsComsDocs.fetchDataFromSupabase(this.tarea.tag);
		// [this.gestiones] = await this._getTareasNewsComsDocs.fetchDataFromSupabase(this.tarea.tag);
		// console.log(this.news, this.coms, this.docs, this.gestiones, this.subtareas);
		console.log(this.subtareas);
	}

	toggleEdit() {
		this.isEditing = !this.isEditing;
	}

	async guardar() {
		if (this.editForm.valid) {
			await this._supabaseService.updateRowTarea('solidaridad_tareas', this.editForm.value, this.tarea.tag);
			this.tarea = this.editForm.value;
			this.toggleEdit();
		}
	}
}
