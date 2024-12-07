import { Component, inject, OnInit } from '@angular/core';
import { SupabaseService } from '@services/supabase.service';
import { INew } from '@interfaces/new.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

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
	private avv: string;
	public news: INew[] = [];

	constructor() {
		// si no se hace en el constructor no funciona
		const navigation = this._router.getCurrentNavigation();
		console.log(navigation);

		this.avv = navigation?.extras?.state?.['avv'] || null;
		// console.log('avv desde estado en constructor:', this.avv);
	}

	ngOnInit(): void {
		this._loadNews();
	}

	private async _loadNews(): Promise<void> {
		console.log('avv:', this.avv);
		if (!this.avv) {
			this.news = await this._supabaseService.fetchNewsOCM('astaRegia');
			console.log('noticias:', this.news);
		} else {
			this.news = await this._supabaseService.fetchNews(this.avv);
		}
	}
}
