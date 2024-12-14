import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';
import { ICard } from '@interfaces/card.interface';
import { SupabaseService } from '@services/supabase.service';

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
	private _pathImage = 'https://cswdadlxiubwdzvqzywc.supabase.co/storage/v1/object/public/laPlata/';
	public cards: ICard[] = [];

	ngOnInit() {
		this.createCardMenu();
	}

	async createCardMenu() {
		try {
			const data = await this._supabaseService.fetchDataHomeAVV('laplata_menu_cards');
			this.cards = data.map((card) => ({
				...card,
				rutaImagen: `${this._pathImage}${card.tag}.jpg`,
				funcion: () => this._router.navigateByUrl(card.tag, { state: { avv: 'laPlata' } })
			}));
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}
}
