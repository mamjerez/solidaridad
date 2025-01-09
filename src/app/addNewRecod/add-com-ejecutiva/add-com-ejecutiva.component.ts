import { Location } from '@angular/common';
import { Component, OnInit, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ErrorFieldComponent } from '@app/commons/components/error-field/error-field.component';

import { AutofocusDirective } from '@app/commons/directives/autofocus.directive';

import { SupabaseService } from '@services/supabase.service';
import { UserService } from '@services/user.service';

@Component({
	selector: 'app-add-com-ejecutiva',
	imports: [ReactiveFormsModule, ErrorFieldComponent, AutofocusDirective],
	templateUrl: './add-com-ejecutiva.component.html',
	styleUrl: './add-com-ejecutiva.component.scss'
})
export default class AddComEjecutivaComponent implements OnInit {
	readonly tag = input.required<string>();
	private _formBuilder = inject(FormBuilder);
	private readonly _userService = inject(UserService);
	private _supabaseService = inject(SupabaseService);
	private _location = inject(Location);
	private _user: string;
	public comForm: FormGroup;

	async ngOnInit(): Promise<void> {
		this._user = this._userService.getUserName();
		this.comForm = this._formBuilder.group({
			date: [''],
			sender: [''],
			text: ['', Validators.required]
		});
	}

	validationMessages = {
		texto: {
			required: 'Debes introducir un texto obligatoriamente'
		}
	};

	async guardar(): Promise<void> {
		const currentDate = new Date().toISOString().slice(0, 16); // Formato para datetime-local
		const currentHour = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		this.comForm.patchValue({ date: currentDate, sender: `${currentHour} ${this._user}` });

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
