import { Component, inject, Input, OnInit } from '@angular/core';
import { SupabaseService } from '@services/supabase.service';
import { INew } from '@interfaces/new.interface';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-noticias',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './noticias.component.html'
})
export default class NoticiasComponent implements OnInit {
	@Input() news: INew[];
	public rowHeight = 15;
	private readonly _supabaseService = inject(SupabaseService);

	ngOnInit(): void {
		this._loadNews();
	}

	private async _loadNews(): Promise<void> {
		this.news = await this._supabaseService.fetchNews('57');
	}
}
