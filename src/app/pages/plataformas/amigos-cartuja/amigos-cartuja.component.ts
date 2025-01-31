import { Component } from '@angular/core';

import { BotonesAddComponent } from '@app/commons/components/botones-add/botones-add.component';
import { InformacionesComponent } from '@app/commons/components/informaciones/informaciones.component';

@Component({
	selector: 'app-amigos-cartuja',
	imports: [InformacionesComponent, BotonesAddComponent],
	templateUrl: './amigos-cartuja.component.html',
	styleUrl: './amigos-cartuja.component.scss'
})
export default class AmigosCartujaComponent {
	// private readonly router = inject(Router);
	public tag = 'cartuja';

	// addCom(): void {
	// 	this.router.navigateByUrl('addCom/' + this.tag);
	// }
}
