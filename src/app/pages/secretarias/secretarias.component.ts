import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-secretarias',
	standalone: true,
	imports: [],
	templateUrl: './secretarias.component.html',
	styleUrl: './secretarias.component.scss'
})
export default class SecretariasComponent {
	private readonly router = inject(Router);

	navigateToPage(): void {
		this.router.navigate(['/secretariasReuniones']);
	}
}
