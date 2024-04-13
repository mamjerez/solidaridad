import { Component, OnInit, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { GetNewsComsDocs } from '@services/getNewsComsDocs.service';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';

import ComentariosComponent from '@app/commons/components/level/comentarios/comentarios.component';
import DocumentosComponent from '@app/commons/components/level/documentos/documentos.component';
import { Router } from '@angular/router';

interface IAsociaciones {
	id: number;
	created_at: string; // Asumiendo que siempre recibes la fecha como cadena
	nombre: string;
	rma: number;
	presidente: string;
	sede: string;
	barrio: string | null; // 'null' explicitado como posible valor
	telefono: string | null;
	contacto: string;
	email: string | null;
	email1: string | null;
	distrito: string;
	tag: string;
	activa: boolean;
	federacion: string;
	cuota2023: boolean;
	cuota2024: boolean;
}

@Component({
	selector: 'app-ficha',
	standalone: true,
	imports: [NgClass, FormsModule, ReactiveFormsModule, ComentariosComponent, DocumentosComponent],
	templateUrl: './ficha.component.html',
	styleUrl: './ficha.component.scss'
})
export default class FichaComponent implements OnInit {
	private _router = inject(Router);
	private _getNewsComsDocs = inject(GetNewsComsDocs);
	private _formBuilder = inject(FormBuilder);

	asociacionForm: FormGroup;
	activeTab = 1;
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public data: IAsociaciones = null;

	constructor() {
		// Hay que hacerlo en el constructor de lo contrario no funciona
		const navigation = this._router.getCurrentNavigation();
		this.data = navigation?.extras.state?.['data'];
	}

	ngOnInit(): void {
		this.fetchData();

		this.asociacionForm = this._formBuilder.group({
			id: [null],
			created_at: [null],
			nombre: [null],
			activa: [null],
			rma: [null],
			presidente: [null],
			sede: [null],
			barrio: [null],
			federacion: [null],
			telefono: [null],
			contacto: [null],
			email: [null],
			email1: [null],
			distrito: [null]
		});
	}

	async fetchData() {
		[this.coms, this.docs] = await this._getNewsComsDocs.fetchDataFromSupabase(this.data.tag);
	}

	selectTab(tabIndex: number) {
		this.activeTab = tabIndex;
	}
}
