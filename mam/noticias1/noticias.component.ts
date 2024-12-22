import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { SupabaseService } from '@services/supabase.service';

import { INew } from '@interfaces/new.interface';

import { CustomDatePipe } from '@app/commons/pipes/custom-date.pipe';

@Component({
	selector: 'app-noticias',
	imports: [CustomDatePipe],
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
		const path = this._location.path();
		const segments = path.split('/');
		this._path = segments[segments.length - 1];
	}

	ngOnInit(): void {
		this._loadNews();
	}

	private async _loadNews(): Promise<void> {
		console.log(this._path);
		console.log(this.avv);

		if (!this.avv) {
			console.log(this._path);
			this.news = await this._supabaseService.fetchNewsOCM(this._path);
			console.log(this.news);
		} else {
			this.news = await this._supabaseService.fetchNews(this.avv);
		}
	}
}
