import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';
import { ICard } from '@interfaces/card.interface';
import { SupabaseService } from '@services/supabase.service';
import { environment } from '@environments/environment';

@Component({
	selector: 'app-la-plata',
	standalone: true,
	imports: [CardMenuComponent],
	templateUrl: './la-plata.component.html',
	styleUrl: './la-plata.component.scss'
})
export default class LaPlataComponent implements OnInit {
	private readonly _supabaseService = inject(SupabaseService);
	private readonly _router = inject(Router);
	public cards: ICard[] = [];

	ngOnInit() {
		this.createCardMenu();
	}

	async createCardMenu() {
		try {
			const data = await this._supabaseService.fetchDataHomeLaPlata('home');
			this.cards = data.map((card) => ({
				...card,
				rutaImagen: `${environment.pathImgSupabase}${card.tag}.jpg`,
				funcion: () => this._router.navigateByUrl(card.tag)
			}));
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}
}
