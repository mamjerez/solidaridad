import { Component, inject, OnInit } from '@angular/core';
import { SupabaseService } from '@services/supabase.service';
import { INew } from '@interfaces/new.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
	selector: 'app-noticias',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './noticias.component.html'
})
export default class NoticiasComponent implements OnInit {
	public rowHeight = 15;
	private readonly _supabaseService = inject(SupabaseService);
	private readonly _router = inject(Router);
	private readonly _activatedRoute = inject(ActivatedRoute);
	private readonly _location = inject(Location);
	private avv: string;
	public news: INew[] = [];
	private _path: string;

	constructor() {
		// si no se hace en el constructor no funciona
		const navigation = this._router.getCurrentNavigation();
		this.avv = navigation?.extras?.state?.['avv'] || null;
		const path = this._location.path(); // '/#/reivindicaciones/alumbrado'
		const segments = path.split('/');
		this._path = segments[segments.length - 1];
	}

	ngOnInit(): void {
		this._loadNews();
	}

	private async _loadNews(): Promise<void> {
		if (!this.avv) {
			this.news = await this._supabaseService.fetchNewsOCM(this._path);
			console.log('noticias:', this.news);
		} else {
			this.news = await this._supabaseService.fetchNews(this.avv);
		}
	}
}
