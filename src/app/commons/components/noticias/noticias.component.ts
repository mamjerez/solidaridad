import { Component, inject, Input, OnInit } from '@angular/core';
// import { ColDef, ICellRendererParams } from 'ag-grid-community';
// import { GenericGridComponent } from '@ag-grid/generic-grid.component';

import { SupabaseService } from '@services/supabase.service';
import { INew } from '@interfaces/new.interface';

@Component({
	selector: 'app-noticias',
	standalone: true,
	// imports: [GenericGridComponent],
	templateUrl: './noticias.component.html'
})
export default class NoticiasComponent implements OnInit {
	@Input() news: INew[];
	public rowHeight = 15;
	// public columnDefs: ColDef[] = [];
	private readonly _supabaseService = inject(SupabaseService);

	ngOnInit(): void {
		if (!this.news) {
			// Resumen noticias
			this._loadNews();
		} else {
			// this._setColumnDefs(false);
		}
	}

	private async _loadNews(): Promise<void> {
		this.news = await this._supabaseService.fetchNews();
		// this._setColumnDefs(true);
	}

	// private _setColumnDefs(includeTag: boolean): void {
	// 	this.columnDefs = [
	// 		{
	// 			headerName: 'Fecha',
	// 			field: 'date',
	// 			editable: true,
	// 			width: 100,
	// 			valueFormatter: (params) => this._formatDate(params.value)
	// 		},
	// 		...(includeTag ? [{ headerName: 'Etiqueta', field: 'tag', width: 175 }] : []),
	// 		{ headerName: 'Medio', field: 'media', width: 125 },
	// 		{
	// 			headerName: 'Titulo',
	// 			field: 'title',
	// 			width: includeTag ? 720 : 896
	// 		},
	// 		{
	// 			headerName: 'Enlace',
	// 			field: 'url_new',
	// 			width: 75,
	// 			cellRenderer: this._urlCellRenderer
	// 		}
	// 	];
	// }

	// private _urlCellRenderer(params: ICellRendererParams): string {
	// 	const url = params.data?.url_new;
	// 	return url ? `<a href="${url}" target="_blank" rel="noopener noreferrer">Enlace</a>` : '';
	// }

	private _formatDate(value: string): string {
		if (value) {
			const date = new Date(value);
			const day = date.getDate().toString().padStart(2, '0');
			const month = (date.getMonth() + 1).toString().padStart(2, '0');
			const year = date.getFullYear();
			return `${day}/${month}/${year}`;
		}
		return '';
	}
}
