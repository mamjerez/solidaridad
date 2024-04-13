import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SupabaseService } from '@services/supabase.service';
import { GetNewsComsDocs } from '@services/getNewsComsDocs.service';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';

import ComentariosComponent from '@app/commons/components/level/comentarios/comentarios.component';
import DocumentosComponent from '@app/commons/components/level/documentos/documentos.component';

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
}

@Component({
	selector: 'app-ficha',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule, ComentariosComponent, DocumentosComponent],
	templateUrl: './ficha.component.html',
	styleUrl: './ficha.component.scss'
})
export default class FichaComponent implements OnInit {
	@Input() id: number;
	private _getNewsComsDocs = inject(GetNewsComsDocs);
	private _supabaseService = inject(SupabaseService);
	private _formBuilder = inject(FormBuilder);
	asociacionForm: FormGroup;
	activeTab = 1;
	public coms: ICom[] = [];
	public docs: IDoc[] = [];

	public data: IAsociaciones = null;

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
		try {
			this.data = await this._supabaseService.fetchDataById('asociaciones', this.id);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
		[this.coms, this.docs] = await this._getNewsComsDocs.fetchDataFromSupabase(this.data[0].tag);
	}

	selectTab(tabIndex: number) {
		this.activeTab = tabIndex;
	}
}
