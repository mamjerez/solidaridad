import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '@services/supabase.service';
import { INew } from '@interfaces/new.interface';
import NoticiasComponent from '@app/commons/components/level/noticias/noticias.component';

@Component({
	selector: 'app-resumen-prensa',
	standalone: true,
	imports: [NoticiasComponent],
	templateUrl: './resumen-prensa.component.html',
	styleUrl: './resumen-prensa.component.scss'
})
export default class ResumenPrensaComponent implements OnInit {
	public news: INew[] = [];
	masonryOptions = {
		gutter: 20,
		fitWidth: true,
		columnWidth: 350
	};

	constructor(private supabaseService: SupabaseService) {}

	async ngOnInit() {
		this.fetchData();
	}

	async fetchData() {
		try {
			this.news = await this.supabaseService.getTodayNews();
		} catch (error) {
			console.error('Error fetching news:', error);
		}
	}
}
