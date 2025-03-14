import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
	providedIn: 'root'
})
export class GetTareasNewsComsDocs {
	private _supabaseService = inject(SupabaseService);

	async fetchDataFromSupabase(tag: string) {
		console.log('Fetching data from Supabase with tag:', tag);

		const dataTypes = [
			// 'solidaridad_news',
			// 'solidaridad_comentarios',
			// 'solidaridad_documentos',
			// 'solidaridad_tareas_gestiones',
			'solidaridad_gestiones'
		];

		return Promise.all(
			dataTypes.map((type) =>
				this._supabaseService.fetchDataByTagOrder(type, tag, false).catch((error) => {
					console.error(`Error fetching ${type}:`, error);
				})
			)
		);
	}
}
