import { Location } from '@angular/common';
import { Component, OnInit, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { SupabaseService } from '@services/supabase.service';

@Component({
	selector: 'app-add-card',

	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './add-card.component.html'
})
export default class AddCardComponent implements OnInit {
	readonly tag = input<string>(undefined);
	private _formBuilder = inject(FormBuilder);
	private _supabaseService = inject(SupabaseService);
	private _location = inject(Location);
	public cardForm: FormGroup;

	ngOnInit(): void {
		this.cardForm = this._formBuilder.group({
			title: ['', Validators.required],
			tag: ['', Validators.required],
			level: ['', Validators.required],
			['levelUp']: [''],
			isLastLevel: [true, Validators.required],
			order: ['']
		});
	}

	async guardar(): Promise<void> {
		if (this.cardForm?.valid) {
			const formData = {
				...this.cardForm.value,
				['levelUp']: this.tag()
			};

			try {
				await this._supabaseService.insertRow('tag_title', formData);
				this._location.back();
			} catch (error) {
				console.error('Error al insertar datos:', error);
			}
		}
	}
}
