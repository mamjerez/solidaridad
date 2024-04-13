import { Location } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { SupabaseService } from '@services/supabase.service';
import { ModalService } from '@app/layouts/modal/modal.service';

@Component({
	selector: 'app-coms-form',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './add-com.component.html'
})
export default class AddComComponent implements OnInit {
	@Input() tag: string;
	comForm: FormGroup;
	private _formBuilder = inject(FormBuilder);
	private _supabaseService = inject(SupabaseService);
	private _location = inject(Location);
	private _modalService = inject(ModalService);

	ngOnInit(): void {
		this.comForm = this._formBuilder.group({
			date: ['', Validators.required],
			sender: ['', Validators.required],
			text: ['', Validators.required],
			confidencial: [false, Validators.required]
		});
	}

	async guardar(): Promise<void> {
		if (this.comForm?.valid) {
			const formData = {
				...this.comForm.value,
				tag: this.tag
			};

			try {
				await this._supabaseService.insertRow('comentarios', formData);
				// this._modalService.close(); // NO FUNCIONA
				this._location.back();
			} catch (error) {
				console.error('Error al insertar datos:', error);
			}
		}
	}
}
