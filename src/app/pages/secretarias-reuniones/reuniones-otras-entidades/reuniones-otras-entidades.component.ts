import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

@Component({
	selector: 'app-reuniones-otras-entidades',
	imports: [CardMenuComponent],
	templateUrl: './reuniones-otras-entidades.component.html',
	styleUrl: './reuniones-otras-entidades.component.scss'
})
export default class ReunionesOtrasEntidadesComponent {
	private readonly router = inject(Router);
	public tag = '20241210';
	navigateTo(page: string): void {
		this.router.navigate([page]);
	}
}
