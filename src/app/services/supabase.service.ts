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

	async getNewsPaginadas(page: number, perPage: number) {
		const start = (page - 1) * perPage;
		const end = start + perPage - 1;
		const { data, error, count } = await this._supabase
			.from('news')
			.select('*', { count: 'exact' })
			.range(start, end)
			.order('date', { ascending: false });

		if (error) throw error;

		return { data, count };
	}

	// TODO: - Add types
	async fetchData(tableName: string): Promise<any> {
		const { data, error } = await this._supabase.from(tableName).select('*');
		if (error) throw error;
		return data;
	}

	async fetchAsociaciones(tableName: string): Promise<any> {
		const { data, error } = await this._supabase
			.from(tableName)
			.select('id,nombre,solidaridad, junta_directiva, distrito,barrio,cuota2024,cuota2025')
			.order('id', { ascending: true });
		if (error) throw error;
		return data;
	}

	async fetchDataByTag(tableName: string, tag: string): Promise<any> {
		const { data, error } = await this._supabase.from(tableName).select('*').eq('tag', tag);
		if (error) throw error;
		return data;
	}

	async fetchDataById(tableName: string, id: string): Promise<any> {
		const { data, error } = await this._supabase.from(tableName).select('*').eq('id', id);
		if (error) throw error;
		return data;
	}

	async fetchDataFromViewAsociaciones(view: string, itemQuery: string, id: number | string): Promise<any> {
		const { data, error } = await this._supabase.from(view).select('*').eq(itemQuery, id);
		if (error) throw error;
		// console.log(JSON.stringify(data));
		return data;
	}

	// async fetchDataPlataformasInfo(view: string, itemQuery: string, id: number | string): Promise<any> {
	// 	const { data, error } = await this._supabase.from(view).select('*').eq(itemQuery, id);
	// 	if (error) throw error;
	// 	// console.log(JSON.stringify(data));
	// 	return data;
	// }

	async fetchDataByTagOrder(tableName: string, tag: string, order: boolean): Promise<any> {
		const { data, error } = await this._supabase
			.from(tableName)
			.select('*')
			.eq('tag', tag)
			.order('date', { ascending: order })
			.order('orden', { ascending: true });
		if (error) throw error;
		// console.log(data);

		return data;
	}

	async fetchDataByLevel(level: string, tag?: string): Promise<any> {
		console.log('Fetching data by level:', tag);

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

	async fetchDataHomeAVV(tabla: string): Promise<any[]> {
		const { data, error } = await this._supabase
			.from(tabla)
			.select('tag,title,has_imagen,is_visible,orden')
			.eq('is_visible', true);

		if (error) {
			console.error('Error fetching data:', error);
			throw error;
		}

		return (data || []).sort((a, b) => a.orden - b.orden);
	}

	async fetchAsociacionesProblemas(asociacion: string): Promise<any[]> {
		const { data, error } = await this._supabase
			.from('solidaridad_asociaciones_problemas_cards')
			.select('tag,title,has_imagen,is_visible,orden')
			.eq('is_visible', true)
			.eq('asociacion', asociacion);

		if (error) {
			console.error('Error fetching data:', error);
			throw error;
		}

		return (data || []).sort((a, b) => a.orden - b.orden);
	}

	async fetchAsociacionesActividades(asociacion: string): Promise<any[]> {
		const { data, error } = await this._supabase
			.from('solidaridad_asociaciones_actividades_cards')
			.select('tag,title,has_imagen,is_visible,orden')
			.eq('is_visible', true)
			.eq('asociacion', asociacion);

		if (error) {
			console.error('Error fetching data:', error);
			throw error;
		}

		return (data || []).sort((a, b) => a.orden - b.orden);
	}

	async fetchAsociacionesHistoria(asociacion: string): Promise<any[]> {
		const { data, error } = await this._supabase
			.from('solidaridad_asociaciones_historia_cards')
			.select('tag,title,etiqueta,has_imagen,is_visible,orden,asociacion')
			.eq('is_visible', true)
			.eq('asociacion', asociacion);

		if (error) {
			console.error('Error fetching data:', error);
			throw error;
		}

		return (data || []).sort((a, b) => a.orden - b.orden);
	}

	async fetchDataFederadas(): Promise<any[]> {
		const { data, error } = await this._supabase
			.from('solidaridad_asociaciones')
			.select('tag,nombre, distrito, barrio, cuota2024,junta_directiva')
			.eq('solidaridad', true)
			.order('cuota2024', { ascending: false });
		if (error) {
			console.error('Error fetching data:', error);
			throw error;
		}

		return data || [];
	}

	async fetchDataAsociacionesById(id: string): Promise<any[]> {
		const { data, error } = await this._supabase
			.from('solidaridad_asociaciones')
			.select('id,nombre,is_activa,rma,NIF,sede,distrito,barrio,email,solidaridad,cuota2023,cuota2024,cuota2025')
			.eq('id', id);

		if (error) {
			console.error('Error fetching data:', error);
			throw error;
		}

		return data || [];
	}

	async fetchDataPlataformas(): Promise<any[]> {
		const { data, error } = await this._supabase.from('solidaridad_plataformas').select('*');
		if (error) {
			console.error('Error fetching data:', error);
			throw error;
		}

		return data || [];
	}

	async fetchFotosByTagOrder(tableName: string, tag: string): Promise<any> {
		const { data, error } = await this._supabase
			.from(tableName)
			.select('*')
			.eq('tag', tag)
			.order('orden', { ascending: true });
		if (error) throw error;
		return data;
	}

	async fetchNews(tag: string, startDate?: string, endDate?: string): Promise<any[]> {
		// let query = this._supabase.from('news').select('*').order('date', { ascending: false }).limit(20);
		let query = this._supabase
			.from('solidaridad_news')
			.select('date, media, title, url_new, tag')
			.eq('tag', tag)
			.order('date', { ascending: false });

		if (startDate && endDate) {
			query = query.gte('date', startDate).lte('date', endDate);
		}

		const { data, error } = await query;

		if (error) throw new Error(error.message);
		return data;
	}
	async fetchNewsOCM(tag: string): Promise<any[]> {
		// let query = this._supabase.from('news').select('*').order('date', { ascending: false }).limit(20);
		const query = this._supabase
			.from('news')
			.select('date, media, title, url_new, tag')
			.eq('tag', tag)
			.order('date', { ascending: false });

		const { data, error } = await query;

		if (error) throw new Error(error.message);
		return data;
	}

	async obtenerCargosByComision(comisionId: number): Promise<any[]> {
		const { data, error } = await this._supabase.rpc('obtener_cargos_por_comision', { comision_id: comisionId });

		if (error) {
			console.error('Error al obtener los cargos:', error);
			throw error;
		}

		return data;
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

	async updateRowTarea(tableName: string, newValues, tag: string) {
		const { data, error } = await this._supabase.from(tableName).update(newValues).eq('tag', tag).select();

		if (error) throw error;
		return data;
	}
}
