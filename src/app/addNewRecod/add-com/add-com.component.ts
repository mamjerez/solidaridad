import { Location } from '@angular/common';
import { Component, OnInit, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { SupabaseService } from '@services/supabase.service';

@Component({
	selector: 'app-coms-form',
	imports: [ReactiveFormsModule],
	templateUrl: './add-com.component.html'
})
export default class AddComComponent implements OnInit {
	readonly tag = input.required<string>();
	public comForm: FormGroup;
	private _formBuilder = inject(FormBuilder);
	private _supabaseService = inject(SupabaseService);
	private _location = inject(Location);

	async ngOnInit(): Promise<void> {
		this.comForm = this._formBuilder.group({
			date: ['', Validators.required],
			sender: [''],
			text: ['', Validators.required],
			confidencial: [false, Validators.required]
		});
	}

	async guardar(): Promise<void> {
		if (this.comForm?.valid) {
			const formData = {
				...this.comForm.value,
				tag: this.tag()
			};

			await this._supabaseService.insertRow('solidaridad_comentarios', formData);
			this._location.back();
		}
	}
}
