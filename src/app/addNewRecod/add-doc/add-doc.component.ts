import { Location } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { SupabaseService } from '@services/supabase.service';

@Component({
	selector: 'app-docs-form',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './add-doc.component.html'
})
export default class AddDocComponent implements OnInit {
	@Input() tag: string;
	docForm: FormGroup;
	private _formBuilder = inject(FormBuilder);
	private _supabaseService = inject(SupabaseService);
	private _location = inject(Location);

	ngOnInit(): void {
		this.docForm = this._formBuilder.group({
			date: ['', Validators.required],
			emisor: ['', Validators.required],
			title: ['', Validators.required],
			url_doc: ['', Validators.required],
			confidencial: [false, Validators.required]
		});
	}

	async guardar(): Promise<void> {
		if (this.docForm?.valid) {
			const formData = {
				...this.docForm.value,
				tag: this.tag
			};

			try {
				await this._supabaseService.insertRow('documents', formData);
				this._location.back();
			} catch (error) {
				console.error('Error al insertar datos:', error);
			}
		}
	}
}
