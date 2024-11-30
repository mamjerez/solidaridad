import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogComponent } from '@app/commons/components/dialog/dialog.component';

import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { DialogService } from '@services/dialog.service';

@Component({
	selector: 'app-contacto',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, DialogComponent],
	templateUrl: './contacto.component.html',
	styleUrl: './contacto.component.scss'
})
export default class ContactoComponent {
	@ViewChild('dialogComponent', { static: false }) dialogComponent!: DialogComponent;
	private readonly _dialogService = inject(DialogService);

	contactForm: FormGroup;

	constructor(private fb: FormBuilder) {
		this.contactForm = this.fb.group({
			name: ['', [Validators.minLength(2)]],
			email: ['', [Validators.email]],
			phone: ['', [Validators.pattern('^[0-9]{9}$')]],
			organization: [''],
			message: ['', [Validators.required, Validators.minLength(10)]]
		});
	}

	onSubmit() {
		if (this.contactForm.valid) {
			this.sendEmail(event);
		}
	}

	public sendEmail(e: Event) {
		const templateParams = {
			name: this.contactForm.value.name,
			email: this.contactForm.value.email,
			phone: this.contactForm.value.phone,
			organization: this.contactForm.value.organization,
			message: this.contactForm.value.message
		};
		e.preventDefault();
		// emailjs.sendForm('service_bexblvo', 'template_06gx2s8', e.target as HTMLFormElement, 'jruEZYrH0HWzWhXDm').then(
		emailjs.send('service_bexblvo', 'template_06gx2s8', templateParams, 'jruEZYrH0HWzWhXDm').then(
			(result: EmailJSResponseStatus) => {
				this.mostrarDialog('Correo enviado correctamente', false, false, 4000);
				console.log(result.text);
				this.contactForm.reset();
			},
			(error) => {
				console.log(error.text);
			}
		);
	}

	private mostrarDialog(mensaje: string, hasError: boolean, isBack: boolean, timeout?: number): void {
		this._dialogService.openDialog(mensaje, hasError, isBack, timeout);
	}
}
