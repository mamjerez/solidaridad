import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
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

import { DialogComponent } from '@app/commons/components/dialog/dialog.component';

import { SupabaseService } from '@services/supabase.service';
import { DialogService } from '@services/dialog.service';

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
	tag: string;
}

@Component({
	selector: 'app-asociaciones-federadas',
	imports: [AgGridModule],
	templateUrl: './asociaciones-federadas.component.html',
	styleUrl: './asociaciones-federadas.component.scss'
})
export default class AsociacionesFederadasComponent implements OnInit {
	@ViewChild('agGrid') agGrid: AgGridAngular;
	@ViewChild('dialogComponent', { static: false }) dialogComponent!: DialogComponent;
	private _columnDefs: ColDef[];
	private _router = inject(Router);
	private _supabaseService = inject(SupabaseService);
	private readonly _dialogService = inject(DialogService);
	private _data: IAsociaciones[];
	public mensaje = '';
	public gridOptions: GridOptions;

	navigateTo(path: string) {
		if (path.startsWith('http')) {
			window.open(path, '_blank');
		} else {
			this._router.navigate([path]);
		}
	}

	ngOnInit(): void {
		this.fetchData();
	}

	async fetchData() {
		try {
			this._data = await this._supabaseService.fetchDataFederadas();
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
				width: 400
				// applyMiniFilterWhileTyping: true
			} as ISetFilterParams,
			{
				headerName: 'Barrio',
				field: 'barrio',
				width: 200
			},
			{
				headerName: 'Distrito',
				field: 'distrito',
				width: 100
			},
			{
				headerName: 'Junta',
				field: 'junta_directiva',
				width: 100
			},
			{
				headerName: 'Cuota2024',
				field: 'cuota2024',
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
		const defaultSortModel: ColumnState[] = [
			{
				colId: 'junta_directiva',
				sort: 'desc',
				sortIndex: 0
			}
		];
		params.columnApi.applyColumnState({ state: defaultSortModel });
	}

	onRowClicked(event: RowClickedEvent) {
		if (!event.data.tag) {
			this.mostrarDialog('Asociación sin datos de momento', true, false, 2000);
			this._router.navigate(['asociacionesFederadas']);
		} else {
			if (event.data.tag === 'albarizuela') {
				window.open('https://albarizuela.org/', '_blank');
			} else {
				// this._router.navigate(['pageAsociacion'], { state: { data: event.data } });
				this._router.navigate(['pageAsociacion', event.data.tag]);
			}
		}
	}

	private mostrarDialog(mensaje: string, hasError: boolean, isBack: boolean, timeout?: number): void {
		this._dialogService.openDialog(mensaje, hasError, isBack, timeout);
	}

	onQuickFilterChanged(event: any): void {
		this.agGrid.api.setQuickFilter(event.target.value);
	}
}
