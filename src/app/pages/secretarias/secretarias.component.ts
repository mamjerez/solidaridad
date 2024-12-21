import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

@Component({
	selector: 'app-secretarias',

	imports: [CardMenuComponent],
	templateUrl: './secretarias.component.html',
	styleUrl: './secretarias.component.scss'
})
export default class SecretariasComponent {
	private readonly router = inject(Router);

	navigateTo(page: string): void {
		this.router.navigate([page]);
	}
}
