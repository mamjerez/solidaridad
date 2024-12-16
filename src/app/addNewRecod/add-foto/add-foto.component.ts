import { Location } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { SupabaseService } from '@services/supabase.service';

interface IFoto {
	id: number;
	url: string;
	descripcion?: string;
	orden?: number;
	tag: string;
	fecha?: string;
}

@Component({
	selector: 'app-add-foto',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './add-foto.component.html',
	styleUrl: './add-foto.component.scss'
})
export default class AddFotoComponent implements OnInit {
	@Input() tag: string;
	public comForm: FormGroup;
	private _formBuilder = inject(FormBuilder);
	private _supabaseService = inject(SupabaseService);
	private _location = inject(Location);
	public data: IFoto = null;

	async ngOnInit(): Promise<void> {
		this.comForm = this._formBuilder.group({
			id: [{ value: null, disabled: true }],
			url: ['', Validators.required],
			descripcion: [''],
			orden: [null],
			fecha: [''],
			tag: [this.tag]
		});

		console.log('Tag:', this.tag);
	}

	async guardar(): Promise<void> {
		if (this.comForm?.valid) {
			const formData = {
				...this.comForm.value,
				tag: this.tag
			};

			try {
				await this._supabaseService.insertRow('laPlata_fotos', formData);
				this._location.back();
			} catch (error) {
				console.error('Error al insertar datos:', error);
			}
		}
	}
}
