import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

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
			console.log(this.contactForm.value);
			// Here you would typically send the form data to your backend
			this.contactForm.reset();
		}
	}
}
