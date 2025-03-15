import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { ColDef, GridOptions, GridReadyEvent, RowClickedEvent } from 'ag-grid-community/main';

import localeTextESPes from '@assets/data/localeTextESPes.json';

import { SupabaseService } from '@services/supabase.service';

import { ITarea } from '@interfaces/tarea.interface';

@Component({
	selector: 'app-tareas-lista',
	imports: [AgGridModule],
	templateUrl: './tareas-lista.component.html',
	styleUrl: './tareas-lista.component.scss'
})
export default class TareasListaComponent implements OnInit {
	@ViewChild('agGrid') agGrid: AgGridAngular;
	public gridOptions: GridOptions;
	private _columnDefs: ColDef[];
	private _router = inject(Router);
	private _supabaseService = inject(SupabaseService);
	private _data: ITarea[];

	ngOnInit(): void {
		this.fetchData();
	}

	async fetchData() {
		this._data = await this._supabaseService.fetchData('solidaridad_tareas');
		this._setColumnDefs();
		this._setGridOptions();
	}

	_setColumnDefs() {
		this._columnDefs = [
			{
				headerName: 'Fecha',
				field: 'fecha_inicio',
				width: 80,
				valueFormatter: (params) => this._formatDate(params.value)
			},
			{
				headerName: 'Tarea',
				field: 'titulo',
				width: 700
			},
			{
				headerName: 'Responsable',
				field: 'responsable',
				width: 120
			},
			{
				headerName: 'Estado',
				field: 'status',
				width: 100
			}
		];
	}

	_setGridOptions() {
		this.gridOptions = {
			defaultColDef: {
				width: 130,
				suppressMovable: true,
				lockPosition: 'left',
				sortable: true,
				resizable: true,
				filter: true,
				headerComponentParams: {
					template:
						'<div class="ag-cell-label-container" role="presentation">' +
						'  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button" ></span>' +
						'  <div ref="eLabel" class="ag-header-cell-label" role="presentation" >' +
						'    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
						'    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
						'    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
						'    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
						'    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
						'    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
						'  </div>' +
						'</div>'
				}
			},

			rowData: JSON.parse(JSON.stringify(this._data)),
			columnDefs: this._columnDefs,
			groupDisplayType: 'custom',
			groupIncludeTotalFooter: true,
			groupIncludeFooter: true,
			groupHeaderHeight: 25,
			headerHeight: 24,
			suppressAggFuncInHeader: true,
			rowSelection: 'single',
			localeText: localeTextESPes,
			pagination: true,
			paginationPageSize: 50
		} as GridOptions;
	}

	onGridReady(params: GridReadyEvent) {
		// const defaultSortModel: ColumnState[] = [
		// 	{
		// 		colId: 'distrito',
		// 		sort: 'asc',
		// 		sortIndex: 0
		// 	}
		// ];
		// params.columnApi.applyColumnState({ state: defaultSortModel });
	}

	onRowClicked(event: RowClickedEvent) {
		console.log('Row clicked', event.data);
		this._router.navigate(['tarea_detalle'], { state: { data: event.data } });
		// const id = event.data.id;
		// this._router.navigate(['/tarea_detalle', id]);
	}

	navigateToAddTarea(): void {
		this._router.navigate(['addTarea']);
	}

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
