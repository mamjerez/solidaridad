import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import {
	ColDef,
	ColumnApi,
	ColumnState,
	GridApi,
	GridOptions,
	GridReadyEvent,
	ISetFilterParams
} from 'ag-grid-community/main';

import { CellRendererOCM } from '@ag-grid/CellRendererOCM';
import localeTextESPes from '@assets/data/localeTextESPes.json';
import asociaciones from '@assets/data/asociaciones.json';
import { Router } from '@angular/router';

@Component({
	selector: 'app-asociaciones',
	standalone: true,
	imports: [AgGridModule],
	templateUrl: './asociaciones.component.html',
	styleUrl: './asociaciones.component.scss'
})
export default class AsociacionesComponent implements OnInit {
	@ViewChild('agGrid') agGrid: AgGridAngular;
	public gridOptions: GridOptions;
	private _columnDefs: ColDef[];
	private _gridApi: GridApi;
	private _columnApi: ColumnApi;
	private _router = inject(Router);

	async ngOnInit(): Promise<void> {
		this._loadTable();
	}

	private async _loadTable() {
		this._setColumnDefs();
		this._setGridOptions();
	}

	_setColumnDefs() {
		this._columnDefs = [
			{
				headerName: 'Nombre',
				field: 'nombre',
				filter: 'agSetColumnFilter',
				width: 425,
				applyMiniFilterWhileTyping: true
			} as ISetFilterParams,
			{
				headerName: 'Distrito',
				field: 'distrito',
				filter: true,
				width: 135
			},
			{
				headerName: 'Barrio',
				field: 'barrio',
				filter: true,
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

			rowData: asociaciones,
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
		this._gridApi = params.api;
		this._columnApi = params.columnApi;

		const defaultSortModel: ColumnState[] = [
			{
				colId: 'distrito',
				sort: 'asc',
				sortIndex: 0
			}
		];
		params.columnApi.applyColumnState({ state: defaultSortModel });
	}

	onRowClicked(event: any) {
		console.log('Row data:', event.data);
		this._router.navigate(['ficha/' + event.data.id]);
	}
}
