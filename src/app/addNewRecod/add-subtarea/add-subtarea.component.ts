import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ErrorFieldComponent } from '@app/commons/components/error-field/error-field.component';

import { SupabaseService } from '@services/supabase.service';

@Component({
	selector: 'app-add-subtarea',
	imports: [ReactiveFormsModule, ErrorFieldComponent],
	templateUrl: './add-subtarea.component.html',
	styleUrl: './add-subtarea.component.scss'
})
export default class AddSubtareaComponent implements OnInit {
	// readonly tag = input.required<string>();
	private _formBuilder = inject(FormBuilder);
	private _supabaseService = inject(SupabaseService);
	private _location = inject(Location);
	public comForm: FormGroup;

	async ngOnInit(): Promise<void> {
		this.comForm = this._formBuilder.group({
			date: ['', Validators.required],
			titulo: ['', Validators.required],
			responsable: ['', Validators.required],
			status: ['', Validators.required],
			tag: ['', Validators.required],
			subtag: ['', Validators.required]
		});
	}

	validationMessages = {
		fecha: {
			required: 'La fecha es obligatoria'
			// fecha: 'Please provide a valid fecha'
		},
		texto: {
			required: 'Debes introducir un texto obligatoriamente'
		}
	};

	async guardar(): Promise<void> {
		if (this.comForm?.valid) {
			const formData = {
				...this.comForm.value
				// tag: this.tag()
			};

			await this._supabaseService.insertRow('solidaridad_subtareas', formData);
			this._location.back();
		}
	}
}
