import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { environment } from '@environments/environment';

import { CardMenuComponent } from '@commons/components/card-menu/card-menu.component';

import { SupabaseService } from '@services/supabase.service';

import { IMenuItem } from '@interfaces/menu.interface';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	standalone: true,
	imports: [CardMenuComponent, RouterOutlet],
	styles: [
		`
			.hero {
				// background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/img/juntaDirectiva.jpg');
				background: url('/assets/img/juntaDirectiva.jpg');
				background-size: cover;
				background-position: center;
				height: 500px;
				display: flex;
				align-items: center;
				justify-content: center;
				text-align: center;
				color: white;
			}
			.hero-content {
				max-width: 800px;
				padding: 2rem;
			}
			.hero h1 {
				font-size: 3rem;
				margin-bottom: 1rem;
			}
			.featured-section {
				padding: 4rem 0;
				background: #f9f9f9;
			}
			.container {
				max-width: 1200px;
				margin: 0 auto;
				padding: 0 1rem;
			}
			.featured-grid {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
				gap: 2rem;
				margin-top: 2rem;
			}
			.featured-item {
				text-align: center;
				padding: 2rem;
				background: white;
				border-radius: 8px;
				box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
			}
			.icon {
				font-size: 2.5rem;
				margin-bottom: 1rem;
			}
		`
	]
})
export default class HomeComponent implements OnInit {
	private _supabaseService = inject(SupabaseService);
	private _router = inject(Router);
	public menuOptions: IMenuItem[] = [];

	ngOnInit() {
		this.createCardMenu();
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
