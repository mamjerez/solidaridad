import { Component, Input, OnInit, inject } from '@angular/core';

import { SupabaseService } from '../../services/supabase.service';

@Component({
	selector: 'app-ficha-politico',
	standalone: true,
	imports: [],
	templateUrl: './ficha-politico.component.html',
	styleUrls: ['./ficha-politico.component.scss']
})
export default class FichaEmpleadoComponent implements OnInit {
	@Input() id?: number;
	//TODO: - Add types
	private _supabaseService = inject(SupabaseService);
	public positionData: any[] = null;
	// public licitacion: any[] = null;
	public employeeName: string = null;

	ngOnInit(): void {
		this.fetchDataFromView();
	}

	async fetchDataFromView() {
		try {
			this.positionData = await this._supabaseService.fetchDataFromView('employee_details', this.id);
			// TODO:  Nombre completo en el server
			this.employeeName = `${this.positionData[0].name} ${this.positionData[0].firstname} ${this.positionData[0].lastname}`;
		} catch (error) {
			console.error('Error fetching data:', error);
		}

		// try {
		// 	this.licitacion = await this._supabaseService.fetchDataFromView(
		// 		'licitacion_news',
		// 		'6482b989-9afa-4551-85b4-52f157d8624d'
		// 	);
		// 	console.log(this.licitacion);
		// } catch (error) {
		// 	console.error('Error fetching data:', error);
		// }
	}
}
