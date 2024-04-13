import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SupabaseService } from '@services/supabase.service';
import { GetNewsComsDocs } from '@services/getNewsComsDocs.service';

import { INew } from '@interfaces/new.interface';
import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import ComentariosComponent from '@app/commons/components/level/comentarios/comentarios.component';

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
	imports: [CommonModule, FormsModule, ReactiveFormsModule, ComentariosComponent],
	templateUrl: './ficha.component.html',
	styleUrl: './ficha.component.scss'
})
export default class FichaComponent implements OnInit {
	@Input() id: number;
	private _router = inject(Router);
	private _getNewsComsDocs = inject(GetNewsComsDocs);
	private _supabaseService = inject(SupabaseService);
	asociacionForm: FormGroup;
	activeTab = 1;
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public news: INew[] = [];

	public data: IAsociaciones = null;

	ngOnInit(): void {
		this.fetchData();
		this.asociacionForm = new FormGroup({
			id: new FormControl(null),
			created_at: new FormControl(''),
			nombre: new FormControl(''),
			activa: new FormControl(null),
			rma: new FormControl(null),
			presidente: new FormControl(''),
			sede: new FormControl(''),
			barrio: new FormControl(''),
			federacion: new FormControl(''),
			telefono: new FormControl(''),
			contacto: new FormControl(''),
			email: new FormControl(''),
			email1: new FormControl(''),
			distrito: new FormControl('')
		});
	}

	async fetchData() {
		try {
			this.data = await this._supabaseService.fetchDataById('asociaciones', this.id);
			console.log('data:', this.data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
		[this.news, this.coms, this.docs] = await this._getNewsComsDocs.fetchDataFromSupabase(this.data[0].tag);
		console.log('coms:', this.coms);
	}

	selectTab(tabIndex: number) {
		this.activeTab = tabIndex;
	}
}
