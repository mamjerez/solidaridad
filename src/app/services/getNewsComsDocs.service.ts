import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
	providedIn: 'root'
})
export class GetNewsComsDocs {
	private _supabaseService = inject(SupabaseService);

	async fetchDataFromSupabase(tag: string) {
		const dataTypes = ['news', 'comentarios', 'documentos'];

		return Promise.all(
			dataTypes.map((type) =>
				this._supabaseService.fetchDataByTagOrder(type, tag, false).catch((error) => {
					console.error(`Error fetching ${type}:`, error);
				})
			)
		);
	}
}
