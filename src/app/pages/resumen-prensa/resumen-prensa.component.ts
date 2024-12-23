import { Component, inject, OnInit } from '@angular/core';

import NoticiasComponent from '@app/commons/components/noticias/noticias.component';

import { SupabaseService } from '@services/supabase.service';

import { INew } from '@interfaces/new.interface';

@Component({
	selector: 'app-resumen-prensa',
	imports: [NoticiasComponent],
	templateUrl: './resumen-prensa.component.html',
	styleUrl: './resumen-prensa.component.scss'
})
export default class ResumenPrensaComponent implements OnInit {
	public news: INew[] = [];
	private readonly _supabaseService = inject(SupabaseService);

	async ngOnInit() {
		this.fetchData();
	}

	async fetchData() {
		this.news = await this._supabaseService.getTodayNews();
	}
}
