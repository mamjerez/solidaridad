import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
	selector: 'app-contacto',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './contacto.component.html',
	styleUrl: './contacto.component.scss'
})
export default class ContactoComponent {
	contactForm: FormGroup;

	constructor(private fb: FormBuilder) {
		this.contactForm = this.fb.group({
			name: ['', [Validators.required, Validators.minLength(2)]],
			email: ['', [Validators.required, Validators.email]],
			phone: ['', [Validators.pattern('^[0-9]{9}$')]],
			organization: [''],
			message: ['', [Validators.required, Validators.minLength(10)]]
		});
	}

	onSubmit() {
		if (this.contactForm.valid) {
			// const serviceID = 'YOUR_SERVICE_ID';
			// const templateID = 'YOUR_TEMPLATE_ID';
			const templateParams = {
				name: this.contactForm.value.name,
				email: this.contactForm.value.email,
				phone: this.contactForm.value.phone,
				organization: this.contactForm.value.organization,
				message: this.contactForm.value.message
			};

			// emailjs.send(serviceID, templateID, templateParams).then(
			// 	(response) => {
			// 		console.log('Email sent successfully', response.status, response.text);
			// 		this.contactForm.reset();
			// 	},
			// 	(error) => {
			// 		console.error('Error sending email', error);
			// 	}
			// );
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
				console.log(result.text);
			},
			(error) => {
				console.log(error.text);
			}
		);
	}
}
