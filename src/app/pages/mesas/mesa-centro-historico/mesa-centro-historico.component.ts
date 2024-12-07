import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { InformacionesComponent } from '@app/commons/components/informaciones/informaciones.component';

@Component({
	selector: 'app-mesa-centro-historico',
	standalone: true,
	imports: [InformacionesComponent],
	templateUrl: './mesa-centro-historico.component.html',
	styleUrl: './mesa-centro-historico.component.scss'
})
export default class MesaCentroHistoricoComponent {
	private readonly router = inject(Router);

	public tag = 'mesaCentroHistorico';

	addCom(): void {
		this.router.navigateByUrl('addCom/' + this.tag);
	}
}
