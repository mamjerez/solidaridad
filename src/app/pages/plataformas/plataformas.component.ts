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
import { DialogComponent } from '@app/commons/components/dialog/dialog.component';
import { DialogService } from '@services/dialog.service';
import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

interface IPlataforma {
	nombre: string;
	presidente: string;
	sede: string;
	telefono: string;
	email: string;
	web: string;
	facebook: string;
	instagram: string;
	twitter: string;
	is_activa: boolean;
	tag: string;
}

@Component({
	selector: 'app-plataformas',
	standalone: true,
	imports: [AgGridModule, CardMenuComponent],
	templateUrl: './plataformas.component.html',
	styleUrl: './plataformas.component.scss'
})
export default class PlataformasComponent implements OnInit {
	@ViewChild('agGrid') agGrid: AgGridAngular;
	@ViewChild('dialogComponent', { static: false }) dialogComponent!: DialogComponent;
	public mensaje = '';
	public gridOptions: GridOptions;
	private _columnDefs: ColDef[];
	private _router = inject(Router);
	private _supabaseService = inject(SupabaseService);
	private readonly _dialogService = inject(DialogService);
	private _data: IPlataforma[];

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
			this._data = await this._supabaseService.fetchDataPlataformas();
		} catch (error) {
			console.error('Error fetching data:', error);
		}
		this._setColumnDefs();
		this._setGridOptions();
	}

	_setColumnDefs() {
		this._columnDefs = [
			{
				headerName: 'id',
				field: 'id',
				width: 42
			},
			{
				headerName: 'Nombre',
				field: 'nombre',
				// filter: 'agSetColumnFilter',
				width: 350
				// applyMiniFilterWhileTyping: true
			} as ISetFilterParams,

			{
				headerName: 'Presidente',
				field: 'presidente',
				width: 250
			},
			{
				headerName: 'Teléfono',
				field: 'telefono',
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
				colId: 'distrito',
				sort: 'asc',
				sortIndex: 0
			}
		];
		params.columnApi.applyColumnState({ state: defaultSortModel });
	}

	onRowClicked(event: RowClickedEvent) {
		if (!event.data.hasFicha) {
			this.mostrarDialog('Plataforma sin datos de momento', true, false, 2000);
			this._router.navigate(['plataformas']);
			// return;
		} else {
			this._router.navigate([event.data.tag], { state: { data: event.data } });
		}
	}

	private mostrarDialog(mensaje: string, hasError: boolean, isBack: boolean, timeout?: number): void {
		this._dialogService.openDialog(mensaje, hasError, isBack, timeout);
	}
}
