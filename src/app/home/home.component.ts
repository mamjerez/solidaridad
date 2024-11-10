import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { environment } from '@environments/environment';

// import { CardMenuComponent } from '@commons/components/card-menu/card-menu.component';

import { SupabaseService } from '@services/supabase.service';

import { IMenuItem } from '@interfaces/menu.interface';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	standalone: true,
	imports: [RouterOutlet]
})
export default class HomeComponent implements OnInit {
	private _supabaseService = inject(SupabaseService);
	private _router = inject(Router);
	public menuOptions: IMenuItem[] = [];
	public images = [
		'/assets/img/juntaDirectiva.jpg',
		'/assets/img/Alcaldesa___Reunion_Federacion_Solidaridad___04.jpg',
		'/assets/img/Alcaldesa_Federacion_Solidaridad.jpg'
	];
	public currentImageIndex = 0;

	ngOnInit() {
		this.createCardMenu();
		this.startSlider();
	}

	startSlider() {
		setInterval(() => {
			this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
		}, 3000); // Cambia cada 3 segundos
	}

	async createCardMenu() {
		try {
			const data = await this._supabaseService.fetchDataByLevel('home');
			this.menuOptions = data.map(({ tag, ...item }: IMenuItem) => ({
				...item,
				tag,
				rutaImagen: `${environment.pathImgSupabase}${tag}.jpg`,
				funcion:
					tag === 'asociaciones' || tag === 'federaciones'
						? () => this._router.navigateByUrl(`${tag}`)
						: () => this._router.navigateByUrl(`level1/${tag}`)
			}));
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}
}
