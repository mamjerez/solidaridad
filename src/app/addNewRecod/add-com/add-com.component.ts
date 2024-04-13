import { Location } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { SupabaseService } from '@services/supabase.service';
import { ModalService } from '@app/layouts/modal/modal.service';

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
	selector: 'app-coms-form',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './add-com.component.html'
})
export default class AddComComponent implements OnInit {
	@Input() tag: number;
	comForm: FormGroup;
	private _formBuilder = inject(FormBuilder);
	private _supabaseService = inject(SupabaseService);
	private _location = inject(Location);
	private _modalService = inject(ModalService);
	public data: IAsociaciones = null;

	async ngOnInit(): Promise<void> {
		this.comForm = this._formBuilder.group({
			date: ['', Validators.required],
			sender: ['', Validators.required],
			text: ['', Validators.required],
			confidencial: [false, Validators.required]
		});

		try {
			this.data = await this._supabaseService.fetchDataById('asociaciones', this.tag);
			console.log('data:', this.data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	async guardar(): Promise<void> {
		if (this.comForm?.valid) {
			const formData = {
				...this.comForm.value,
				tag: this.data[0].tag
			};

			try {
				await this._supabaseService.insertRow('comentarios', formData);
				// this._modalService.close(); // NO FUNCIONA
				this._location.back();
			} catch (error) {
				console.error('Error al insertar datos:', error);
			}
		}
	}
}
