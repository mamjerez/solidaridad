import { Component, inject, OnInit } from '@angular/core';
import { SupabaseService } from '@services/supabase.service';
import { INew } from '@interfaces/new.interface';
import NoticiasComponent from '@app/commons/components/level/noticias/noticias.component';

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
