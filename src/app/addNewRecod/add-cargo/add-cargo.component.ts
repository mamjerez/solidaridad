import { Location } from '@angular/common';
import { Component, OnInit, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ErrorFieldComponent } from '@app/commons/components/error-field/error-field.component';

import { SupabaseService } from '@services/supabase.service';

@Component({
	selector: 'app-add-cargo',
	imports: [ReactiveFormsModule, ErrorFieldComponent],
	templateUrl: './add-cargo.component.html',
	styleUrl: './add-cargo.component.scss'
})
export default class AddCargoComponent implements OnInit {
	readonly tag = input.required<string>();
	private _formBuilder = inject(FormBuilder);
	private _supabaseService = inject(SupabaseService);
	private _location = inject(Location);
	public comForm: FormGroup;
	public contactoForm: FormGroup;

	async ngOnInit(): Promise<void> {
		this.comForm = this._formBuilder.group({
			nombre: ['', Validators.required],
			apellido1: [''],
			apellido2: [''],
			cargo: ['']
		});

		this.contactoForm = this._formBuilder.group({
			telefono: [''],
			email: ['']
		});
	}

	validationMessages = {
		nombre: {
			nombre: 'El nombre es obligatorio'
		}
	};

	async guardar(): Promise<void> {
		if (this.comForm?.valid) {
			const formDataCargo = {
				...this.comForm.value,
				id_asociacion: this.tag()
			};

			const result = await this._supabaseService.insertRow('solidaridad_asociaciones_cargos', formDataCargo);
			// const insertedId = result[0]?.id; // Asumiendo que el ID del registro insertado está en la propiedad 'id'
			// console.log('ID del registro insertado:', insertedId);
			const formDataContacto = {
				...this.contactoForm.value,
				id_cargo: result[0]?.id
			};

			await this._supabaseService.insertRow('solidaridad_asociaciones_cargos_contactos', formDataContacto);
			this._location.back();
		}
	}
}
