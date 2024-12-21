import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import {
	ColDef,
	ColumnState,
	GridOptions,
	GridReadyEvent,
	ISetFilterParams,
	RowClickedEvent
} from 'ag-grid-community/main';

import localeTextESPes from '@assets/data/localeTextESPes.json';
import { Router } from '@angular/router';
import { SupabaseService } from '@services/supabase.service';

interface IAsociaciones {
	id: number;
	created_at: string;
	nombre: string;
	rma: number;
	presidente: string;
	sede: string;
	barrio: string | null;
	telefono: string | null;
	contacto: string;
	email: string | null;
	email1: string | null;
	distrito: string;
}

@Component({
	selector: 'app-federaciones',

	imports: [AgGridModule],
	templateUrl: './federaciones.component.html',
	styleUrl: './federaciones.component.scss'
})
export default class FederacionesComponent implements OnInit {
	@ViewChild('agGrid') agGrid: AgGridAngular;
	public gridOptions: GridOptions;
	private _columnDefs: ColDef[];
	private _router = inject(Router);
	private _supabaseService = inject(SupabaseService);
	private _data: IAsociaciones[];

	ngOnInit(): void {
		this.fetchData();
	}

	async fetchData() {
		try {
			this._data = await this._supabaseService.fetchData('federaciones');
		} catch (error) {
			console.error('Error fetching data:', error);
		}
		this._setColumnDefs();
		this._setGridOptions();
	}

	_setColumnDefs() {
		this._columnDefs = [
			{
				headerName: 'Nombre',
				field: 'nombre',
				// filter: 'agSetColumnFilter',
				width: 425
				// applyMiniFilterWhileTyping: true
			} as ISetFilterParams,
			{
				headerName: 'Distrito',
				field: 'distrito',
				// filter: true,
				width: 135
			},
			{
				headerName: 'Barrio',
				field: 'barrio',
				// filter: true,
				width: 200
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
				resizable: false,
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
			paginationPageSize: 25
		} as GridOptions;
	}

	onGridReady(params: GridReadyEvent) {
		const defaultSortModel: ColumnState[] = [
			{
				colId: 'distrito',
				sort: 'asc',
				sortIndex: 0
			}
		];
		params.columnApi.applyColumnState({ state: defaultSortModel });
	}

	onRowClicked(event: RowClickedEvent) {
		this._router.navigate(['ficha'], { state: { data: event.data } });
	}
}
