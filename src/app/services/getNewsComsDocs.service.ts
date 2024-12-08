import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
	providedIn: 'root'
})
export class GetNewsComsDocs {
	private _supabaseService = inject(SupabaseService);

	async fetchDataFromSupabase(avv: string) {
		const dataTypes = [
			'solidaridad_news',
			'solidaridad_comentarios',
			'solidaridad_documentos',
			'solidaridad_gestiones'
		];

		return Promise.all(
			dataTypes.map((type) =>
				this._supabaseService.fetchDataByTagOrder(type, avv, false).catch((error) => {
					console.error(`Error fetching ${type}:`, error);
				})
			)
		);
	}

	async fetchDatPlataformas(avv: string) {
		const dataTypes = ['news', 'solidaridad_comentarios', 'solidaridad_documentos', 'solidaridad_gestiones'];

		return Promise.all(
			dataTypes.map((type) =>
				this._supabaseService.fetchDataPlataformasInfo(type, 'tag', avv).catch((error) => {
					console.error(`Error fetching ${type}:`, error);
				})
			)
		);
	}
}
