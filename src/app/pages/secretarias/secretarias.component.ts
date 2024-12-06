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

	navigateToPage(page: string): void {
		this.router.navigate([page]);
	}
}
