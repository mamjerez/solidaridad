import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '@services/supabase.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

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
}

@Component({
	selector: 'app-ficha',
	standalone: true,
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	templateUrl: './ficha.component.html',
	styleUrl: './ficha.component.scss'
})
export default class FichaComponent implements OnInit {
	@Input() id: number;
	private _router = inject(Router);
	private _supabaseService = inject(SupabaseService);
	asociacionForm: FormGroup;

	public data: IAsociaciones = null;

	ngOnInit(): void {
		console.log('id', this.id);
		this.fetchData();
		this.asociacionForm = new FormGroup({
			id: new FormControl(null),
			created_at: new FormControl(''),
			nombre: new FormControl(''),
			rma: new FormControl(null),
			presidente: new FormControl(''),
			sede: new FormControl(''),
			barrio: new FormControl(''),
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
			console.log('dataBasic:', this.data[0]);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}
}
