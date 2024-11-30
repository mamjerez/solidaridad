import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
	providedIn: 'root'
})
export class SupabaseService {
	private _supabase: SupabaseClient;

	constructor() {
		const supabaseUrl = environment.supabaseUrl;
		const supabaseKey = environment.supabaseKey;
		this._supabase = createClient(supabaseUrl, supabaseKey);
	}

	async getTodayNews(): Promise<any[]> {
		const today = new Date();
		const yesterday = new Date();
		yesterday.setDate(today.getDate() - 1);

		const todayStr = today.toISOString().split('T')[0];
		const yesterdayStr = yesterday.toISOString().split('T')[0];
		const { data, error } = await this._supabase.from('news').select('*').in('date', [todayStr, yesterdayStr]);

		if (error) throw error;
		return data || [];
	}

	// TODO: - Add types
	async fetchData(tableName: string): Promise<any> {
		const { data, error } = await this._supabase.from(tableName).select('*');
		if (error) throw error;
		return data;
	}

	async fetchDataFromViewAsociaciones(view: string, itemQuery: string, id: number | string): Promise<any> {
		const { data, error } = await this._supabase.from(view).select('*').eq(itemQuery, id);
		if (error) throw error;
		// console.log(JSON.stringify(data));
		return data;
	}

	async fetchDataByTagOrder(tableName: string, tag: string, order: boolean): Promise<any> {
		const { data, error } = await this._supabase
			.from(tableName)
			.select('*')
			.eq('tag', tag)
			.order('date', { ascending: order });
		if (error) throw error;
		return data;
	}

	async fetchDataByLevel(level: string, tag?: string): Promise<any> {
		const { data, error } = await this._supabase
			.from('albarizuela_menu_cards')
			.select('id,tag,title,level,has_imagen,is_last_level,is_visible,orden,level_up,url_externa')
			.eq('level', level);
		const dataFiltered = data
			.filter((item) => item.is_visible === true)
			.filter((item) => (tag ? item['level_up'] === tag : true));

		if (error) throw error;

		return dataFiltered.sort((a, b) => a.orden - b.orden);
	}

	async fetchDataHomeSanEnrique(level: string, tag?: string): Promise<any> {
		const { data, error } = await this._supabase
			.from('sanenrique_menu_cards')
			.select('id,tag,title,level,has_imagen,is_last_level,is_visible,orden,level_up,url_externa')
			.eq('level', level);
		const dataFiltered = data
			.filter((item) => item.is_visible === true)
			.filter((item) => (tag ? item['level_up'] === tag : true));

		if (error) throw error;

		return dataFiltered.sort((a, b) => a.orden - b.orden);
	}

	async fetchDataFederadas(): Promise<any> {
		const { data, error } = await this._supabase
			.from('solidaridad_asociaciones')
			.select('id,nombre,distrito,barrio,solidaridad,tag');

		const dataFiltered = data.filter((item) => item.solidaridad === true);
		console.log(dataFiltered);

		if (error) throw error;

		return dataFiltered;
	}

	async insertRow(tableName: string, dataForm: any): Promise<any> {
		const { data, error } = await this._supabase.from(tableName).insert([dataForm]).select();

		if (error) throw error;
		return data;
	}

	async updateRow(tableName: string, newValues, tag: string) {
		console.log(newValues);

		const { data, error } = await this._supabase.from(tableName).update(newValues).eq('tag', tag).select();

		if (error) throw error;
		return data;
	}
}
