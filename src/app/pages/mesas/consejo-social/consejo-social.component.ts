import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { InformacionesComponent } from '@app/commons/components/informaciones/informaciones.component';

@Component({
	selector: 'app-consejo-social',
	standalone: true,
	imports: [InformacionesComponent],
	templateUrl: './consejo-social.component.html',
	styleUrl: './consejo-social.component.scss'
})
export default class ConsejoSocialComponent {
	private readonly router = inject(Router);

	public tag = 'consejoSocial';

	addCom(): void {
		this.router.navigateByUrl('addCom/' + this.tag);
	}
}
