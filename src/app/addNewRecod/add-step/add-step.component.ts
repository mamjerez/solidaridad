import { Location } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { SupabaseService } from '@services/supabase.service';

@Component({
	selector: 'app-step-form',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './add-step.component.html'
})
export default class AddStepComponent implements OnInit {
	@Input() tag: string;
	stepForm: FormGroup;
	private _formBuilder = inject(FormBuilder);
	private _supabaseService = inject(SupabaseService);
	private _location = inject(Location);

	ngOnInit(): void {
		this.stepForm = this._formBuilder.group({
			date: ['', Validators.required],
			step: ['', Validators.required]
		});
	}

	async guardar(): Promise<void> {
		if (this.stepForm?.valid) {
			const formData = {
				...this.stepForm.value,
				tag: this.tag
			};

			try {
				await this._supabaseService.insertRow('steps', formData);
				this._location.back();
			} catch (error) {
				console.error('Error al insertar datos:', error);
			}
		}
	}
}
