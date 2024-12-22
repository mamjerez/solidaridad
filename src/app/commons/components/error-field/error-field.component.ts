import { FormControl, AbstractControl, FormGroupDirective } from '@angular/forms';
import { Component, inject, input } from '@angular/core';
import { ValidationPipe } from '@app/commons/pipes/validation.pipe';

@Component({
	selector: 'app-error-field',
	templateUrl: './error-field.component.html',
	styleUrl: './error-field.component.scss',
	imports: [ValidationPipe]
	// host: { class: 'blink' }
})
export class ErrorFieldComponent {
	readonly control = input.required<FormControl | AbstractControl>();
	readonly errorMessages = input.required<object>();
	public formDirective = inject(FormGroupDirective);
}
