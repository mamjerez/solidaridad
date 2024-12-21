import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INew } from '@interfaces/new.interface';
import { SupabaseService } from '@services/supabase.service';
import { PaginationComponent } from '@app/commons/components/pagination.component';

@Component({
	selector: 'app-resumen-prensa-paginado',

	imports: [CommonModule, PaginationComponent],
	templateUrl: './resumen-prensa-paginado.component.html',
	styleUrl: './resumen-prensa-paginado.component.scss'
})
export default class ResumenPrensaPaginadoComponent implements OnInit {
	public news: INew[] = [];
	currentPage = 1;
	newsPerPage = 10;
	totalPages = 1;

	private readonly _supabaseService = inject(SupabaseService);

	async ngOnInit() {
		await this.loadNews();
	}

	async changePage(page: number) {
		this.currentPage = page;
		await this.loadNews();
	}

	private async loadNews() {
		try {
			const { data, count } = await this._supabaseService.getNewsPaginadas(this.currentPage, this.newsPerPage);

			this.news = data || [];
			this.totalPages = Math.ceil((count || 0) / this.newsPerPage);
		} catch (error) {
			console.error('Error loading news:', error);
		}
	}
}
