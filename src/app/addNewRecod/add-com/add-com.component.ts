import { Location } from '@angular/common';
import { Component, OnInit, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorFieldComponent } from '@app/commons/components/error-field/error-field.component';
import { AutofocusDirective } from '@app/commons/directives/autofocus.directive';

import { SupabaseService } from '@services/supabase.service';

@Component({
	selector: 'app-coms-form',
	imports: [ReactiveFormsModule, ErrorFieldComponent, AutofocusDirective],
	templateUrl: './add-com.component.html'
})
export default class AddComComponent implements OnInit {
	readonly tag = input.required<string>();
	private _formBuilder = inject(FormBuilder);
	private _supabaseService = inject(SupabaseService);
	private _location = inject(Location);
	public comForm: FormGroup;

	async ngOnInit(): Promise<void> {
		this.comForm = this._formBuilder.group({
			date: ['', Validators.required],
			sender: [''],
			text: ['', Validators.required]
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
				...this.comForm.value,
				tag: this.tag(),
				confidencial: false
			};

			await this._supabaseService.insertRow('solidaridad_comentarios', formData);
			this._location.back();
		}
	}
}
