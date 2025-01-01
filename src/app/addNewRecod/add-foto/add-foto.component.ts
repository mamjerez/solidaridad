import { Location } from '@angular/common';
import { Component, OnInit, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { SupabaseService } from '@services/supabase.service';

@Component({
	selector: 'app-add-foto',
	imports: [ReactiveFormsModule],
	templateUrl: './add-foto.component.html',
	styleUrl: './add-foto.component.scss'
})
export default class AddFotoComponent implements OnInit {
	readonly tag = input.required<string>();
	public comForm: FormGroup;
	private _formBuilder = inject(FormBuilder);
	private _supabaseService = inject(SupabaseService);
	private _location = inject(Location);

	async ngOnInit(): Promise<void> {
		this.comForm = this._formBuilder.group({
			id: [{ value: null, disabled: true }],
			url: ['', Validators.required],
			descripcion: [''],
			orden: [null],
			fecha: ['']
		});
	}

	async guardar(): Promise<void> {
		if (this.comForm?.valid) {
			const formData = {
				...this.comForm.value,
				tag: this.tag()
			};

			// await this._supabaseService.insertRow('laPlata_fotos', formData);
			await this._supabaseService.insertRow('solidaridad_asociaciones_fotos', formData);
			this._location.back();
		}
	}
}
