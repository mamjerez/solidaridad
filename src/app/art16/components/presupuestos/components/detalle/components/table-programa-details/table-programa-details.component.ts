import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { AsyncPipe, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import {
	ColDef,
	ColGroupDef,
	ColumnApi,
	ColumnState,
	GridApi,
	GridOptions,
	GridReadyEvent,
	RowGroupingDisplayType
} from 'ag-grid-community/main';

import { CellRendererOCM, CellRendererOCMtext } from '@ag-grid/CellRendererOCM';
import localeTextESPes from '@assets/data/localeTextESPes.json';
import { getColumnDefsDetails } from './components/getColumnDefsDetails';

import { AvalaibleYearsService } from '@services/avalaibleYears.service';
import { DataStoreFichaProgramaService } from '@services/dataStoreFichaPrograma.service';
import { DataStoreService } from '@services/dataStore.service';
import { HasRowClicked } from '@services/hasRowClicked.service';
import { PrepareDataGastosService } from '@services/prepareDataGastos.service';
import { ScreenSizeService } from '@services/screenSize.service';

import { IDataTable } from '@interfaces/dataTable.interface';
import { IDataGasto } from '@interfaces/dataGasto.interface';

@Component({
	selector: 'app-table-programa-details',
	templateUrl: './table-programa-details.component.html',
	standalone: true,
	imports: [AgGridModule, AsyncPipe]
})
export default class TableProgramaDetailsComponent implements OnInit, OnDestroy {
	@ViewChild('agGrid') agGrid: AgGridAngular;
	private _location = inject(Location);
	private _route = inject(ActivatedRoute);
	private _router = inject(Router);
	private _avalaibleYearsService = inject(AvalaibleYearsService);
	private _dataStoreFichaProgramaService = inject(DataStoreFichaProgramaService);
	private _dataStoreService = inject(DataStoreService);
	private _hasRowClicked = inject(HasRowClicked);
	private _prepareDataGastosService = inject(PrepareDataGastosService);
	public gridOptions: GridOptions;
	private _path: string;
	private _columnApi: ColumnApi;
	private _columnDefs: (ColDef | ColGroupDef)[];
	private _dataTable: IDataTable;
	private _gridApi: GridApi;
	private _rowData: IDataGasto[] = [];
	private _rowDataFicha: IDataGasto[] = [];
	private _subHeaderName = '';
	private sub: Subscription;
	private _appPresupuestarias = [];
	private levelDetails = 0;
	private _clasificationType: string;
	private _CodFilter: string;
	private _fontSize = '14px';
	private _screenSizeSubscription: Subscription;
	private _screenWidth: number;
	private _columnWidth: number;
	public title: string;
	public buttonExpandirColapsar = true;
	public isExpanded = true;
	public titleButtom = '';
	public showButtomExpanded = true;
	public hasRowClicked$ = this._hasRowClicked.currentHasRowClicked;
	public hasAppPresupuestaria = false;
	public isDisabled = true;
	public buttonVisible = true;
	public autoGroupColumnDef: ColDef; // Define la propiedad sin asignarle un valor inicial
	public groupDisplayType: RowGroupingDisplayType = 'singleColumn';
	private _screenSizeService = inject(ScreenSizeService);

	constructor() {
		this.sub = this._route.params.subscribe((params) => {
			this._path = params['origen'];
		});
	}

	async ngOnInit(): Promise<void> {
		this._screenSizeSubscription = this._screenSizeService.getScreenSize().subscribe((width) => {
			this._screenWidth = width;
			this._fontSize = width < 600 ? '10px' : '10px';
			this.adjustAutoGroupColumnDef(width);
		});
		this._dataTable = this._dataStoreService.dataTable;
		this._clasificationType = this._dataTable.clasificationType;

		// const programa = this._dataStoreService.selectedCodeRowFirstLevel.split(' - ')[1];
		const programa = this._dataStoreService.selectedCodeRowFirstLevel;

		switch (this._path) {
			case 'details':
				switch (this._clasificationType) {
					case 'gastosProgramaProgramas':
						this.title = 'Detalle programa ' + programa;
						this._CodFilter = 'CodPro';
						break;
					case 'gastosProgramaGrupos':
						this.title = 'Detalle grupo programas ' + programa;
						this._CodFilter = 'CodGru';
						break;
					case 'gastosProgramaPoliticas':
						this.title = 'Detalle política ' + programa;
						this._CodFilter = 'CodPol';
						break;
					case 'gastosProgramaAreas':
						this.title = 'Detalle area ' + programa;
						this._CodFilter = 'CodAre';
						break;

					default:
						break;
				}

				await this._CalcDataDetails(this._CodFilter);
				this._columnDefs = getColumnDefsDetails(this._avalaibleYearsService, 'detalle');
				this._setGridOptions();
				this.titleButtom = ' Seleccionar app presupuestaria para ver su detalle';
				break;
			case 'gastan':
				this.title = 'Programas que gastan del económico ' + programa;
				await this._CalcDataGastan();
				this._columnDefs = getColumnDefsDetails(this._avalaibleYearsService, 'gastanEconomico');
				this._setGridOptions();
				this.titleButtom = 'Seleccionar programa para ver su detalle';
				this.showButtomExpanded = false;

				break;
			case 'organico':
				this.title = 'Programas que componen el orgánico ' + programa;
				await this._CalcDataGastan();
				this._columnDefs = getColumnDefsDetails(this._avalaibleYearsService, 'gastanOrganico');
				this._setGridOptions();
				this.titleButtom = 'Seleccionar programa para ver su detalle';
				this.showButtomExpanded = false;
				break;
			case 'appPresupuestaria':
				this.title = 'Aplicación presupuestaria ' + programa;
				await this._CalcDataGastan();
				this._columnDefs = getColumnDefsDetails(this._avalaibleYearsService, 'appPresupuestaria');
				this._setGridOptions();
				this.showButtomExpanded = false;
				break;
		}
	}

	adjustAutoGroupColumnDef(width: number): void {
		this._columnWidth = width < 600 ? 289 : 500; // Ajusta el valor de _columnWidth basado en el tamaño de pantalla
		this.autoGroupColumnDef = {
			headerName: 'Capítulo-Económico',
			field: 'DesEco',
			width: this._columnWidth,
			pinned: 'left',
			cellRenderer: CellRendererOCMtext,
			valueGetter: (params) => {
				if (params?.data) {
					return `<span style="color: black; font-family:var(--fuente-principal);font-size: ${this._fontSize};padding-left: 5px;">${
						params.data.CodEco + '-' + params.data.DesEco
					}</span>`;
				} else {
					return `<span style="white-space: pre;color: red; font-size: ${this._fontSize}; font-family:var(--fuente-principal);font-weight: bold;text-align: right;padding-left: 175px;">TOTAL PROGRAMA
					</span>`;
				}
			}
		};

		// Si el grid ya está inicializado, actualiza la configuración del grid para aplicar el cambio
		if (this.agGrid?.api) {
			this.agGrid.api.setColumnDefs([
				...this.agGrid.columnApi.getAllColumns().map((col) => col.getColDef()),
				this.autoGroupColumnDef
			]);
		}
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

	async _CalcDataDetails(CodFilter: string) {
		this._subHeaderName = this._dataTable.dataPropertyTable.subHeaderName;
		const codigoSearch = this._dataStoreService.selectedCodeRowFirstLevel.split(' ')[0].toString();
		this._rowData = (await this._prepareDataGastosService.getDataAllYear()).filter(
			(x) => x[CodFilter].toString() === codigoSearch
		);
	}

	async _CalcDataGastan() {
		let cod = '';
		const codigoSearch = this._dataStoreService.selectedCodeRowFirstLevel.split(' ')[0];
		const clasificationType = this._dataStoreService.dataTable.clasificationType;

		if (this._path === 'gastan') {
			cod = clasificationType === 'gastosEconomicaCapitulos' ? 'CodCap' : 'CodEco';
		} else {
			cod = 'CodOrg';
		}

		this._rowData = (await this._prepareDataGastosService.getDataAllYear()).filter((x) => x[cod] == codigoSearch);
		const SelectedYears = this._avalaibleYearsService.getYearsSelected();
		const targetYears = SelectedYears.length === 1 ? [1] : SelectedYears;
		const totalsByCodPro = {};
		const fields = [
			'Definitivas',
			'GastosComprometidos',
			'Iniciales',
			'Modificaciones',
			'ObligacionesPendientePago',
			'ObligacionesReconocidasNetas',
			'Pagos',
			'RemanenteCredito'
		];

		// Preparación: inicializar el objeto de totales con estructura básica
		this._rowData.forEach((item) => {
			if (!totalsByCodPro[item.CodPro]) {
				totalsByCodPro[item.CodPro] = {
					CodPro: item.CodPro,
					DesPro: item.DesPro
				};
			}
		});

		// Totalización
		for (const year of targetYears) {
			this._rowData.forEach((item) => {
				fields.forEach((field) => {
					const key = `${field}${year}`;

					// Asegura que la propiedad exista e inicialízala a 0 si no existe
					if (!totalsByCodPro[item.CodPro][key]) {
						totalsByCodPro[item.CodPro][key] = 0;
					}

					// Suma los valores
					if (item[key]) {
						totalsByCodPro[item.CodPro][key] += item[key];
					}
				});
			});
		}

		this._rowData = Object.values(totalsByCodPro);
		if (this._path === 'gastan') {
			// code
		} else {
			cod = 'CodOrg';
			this._rowDataFicha = (await this._prepareDataGastosService.getDataAllYear()).filter(
				(x) => x[cod] == codigoSearch
			);

			const SelectedYears = this._avalaibleYearsService.getYearsSelected();
			const targetYears = SelectedYears.length === 1 ? [1] : SelectedYears;
			const totalsByCodOrg = {};
			const fields = [
				'Definitivas',
				'GastosComprometidos',
				'Iniciales',
				'Modificaciones',
				'ObligacionesPendientePago',
				'ObligacionesReconocidasNetas',
				'Pagos',
				'RemanenteCredito'
			];

			// Preparación: inicializar el objeto de totales con estructura básica
			this._rowDataFicha.forEach((item) => {
				if (!totalsByCodOrg[item.CodOrg]) {
					totalsByCodOrg[item.CodOrg] = {
						CodOrg: item.CodOrg,
						DesOrg: item.DesOrg
						// CodPro: item.CodPro,
						// DesPro: item.DesPro
					};
				}
			});

			// Totalización
			for (const year of targetYears) {
				this._rowDataFicha.forEach((item) => {
					fields.forEach((field) => {
						const key = `${field}${year}`;

						// Asegura que la propiedad exista e inicialízala a 0 si no existe
						if (!totalsByCodOrg[item.CodOrg][key]) {
							totalsByCodOrg[item.CodOrg][key] = 0;
						}

						// Suma los valores
						if (item[key]) {
							totalsByCodOrg[item.CodOrg][key] += item[key];
						}
					});
				});
			}

			this._rowDataFicha = Object.values(totalsByCodOrg);
		}
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
				aggFunc: 'sum',
				cellRenderer: CellRendererOCM,
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
			rowData: this._rowData,
			columnDefs: this._columnDefs,
			groupDisplayType: 'custom',
			groupSuppressBlankHeader: true,
			groupIncludeFooter: false,
			groupHeaderHeight: 15,
			headerHeight: 24,
			suppressAggFuncInHeader: true,
			rowSelection: 'single',
			rowHeight: 14,
			localeText: localeTextESPes,
			pagination: false,
			paginationPageSize: 26,
			onRowClicked: () => {
				this.levelDetails += 1;
				const selectedRows = this.agGrid.api.getSelectedNodes();
				this._dataStoreService.selectedCodeRowFirstLevel =
					selectedRows[0].data.CodPro + ' ' + selectedRows[0].data.DesPro;
				this._hasRowClicked.change(selectedRows[0].key);
				this.isDisabled = false;
				switch (this._path) {
					case 'details':
						this._showAppPresupuestaria();
						this.titleButtom = 'Detalle app presupuestaria seleccionada';
						break;
					case 'organico':
					case 'gastan':
						switch (this.levelDetails) {
							case 0:
								this.titleButtom = 'Detalle programa seleccionado';
								break;
							case 1:
								this._showProgramDetails();
								this.titleButtom = 'Seleccionar app presupuestaria para ver su detalle';
								break;
							case 2:
								this._showAppPresupuestaria();
								this.titleButtom = 'Detalle app presupuestaria seleccionada';
								break;
							default:
								break;
						}

						break;
				}
			}
		} as GridOptions;
	}

	onGridReady = (params: GridReadyEvent) => {
		this._gridApi = params.api;
		this._columnApi = params.columnApi;
		this._gridApi.expandAll();

		const defaultSortModel: ColumnState[] = [
			{
				colId: this._dataTable.dataPropertyTable.codField,
				sort: 'asc',
				sortIndex: 0
			}
		];
		params.columnApi.applyColumnState({ state: defaultSortModel });
	};

	_createAppPresupuestarias() {
		// Aplicación presupuestaria = orgánico + programa + económico.
		// Creo item para cada uno de los aplicaciones presupuestarias existentes en programa seleccionado.
		this._rowData.map((item) => {
			item.appPresupuestaria = item.CodOrg + '-' + item.CodPro + '-' + item.CodEco;
			this._appPresupuestarias.push(item.appPresupuestaria);
		});
	}

	_filterByAppPresupuestaria(appPresupuestaria) {
		const years = this._avalaibleYearsService.getYearsSelected();
		const dataFinal = [];
		this._appPresupuestarias = this._appPresupuestarias.filter((x) => x === appPresupuestaria);
		this._appPresupuestarias.map((item) => {
			const dataIntermedio = this._rowData.filter((x) => x.appPresupuestaria === item);

			const value = {
				AplicacionPresupuestaria: item,
				CodOrg: item.split('-')[0],
				CodPro: item.split('-')[1],
				CodEco: item.split('-')[2],
				CodCap: item.split('-')[2].charAt(0),
				DesOrg: dataIntermedio[0].DesOrg,
				DesPro: dataIntermedio[0].DesPro,
				DesCap: dataIntermedio[0].DesCap,
				DesEco: dataIntermedio[0].DesEco
			};

			years.forEach((year) => {
				let _myYear: number;
				if (this._avalaibleYearsService.getYearsSelected().length === 1) {
					_myYear = 1;
				} else {
					_myYear = year;
				}

				value[`Iniciales${_myYear}`] = dataIntermedio[0][`Iniciales${_myYear}`];
				value[`Modificaciones${_myYear}`] = dataIntermedio[0][`Modificaciones${_myYear}`];
				value[`Definitivas${_myYear}`] = dataIntermedio[0][`Definitivas${_myYear}`];
				value[`GastosComprometidos${_myYear}`] = dataIntermedio[0][`GastosComprometidos${_myYear}`];
				value[`ObligacionesReconocidasNetas${_myYear}`] = dataIntermedio[0][`ObligacionesReconocidasNetas${_myYear}`];
				value[`Pagos${_myYear}`] = dataIntermedio[0][`Pagos${_myYear}`];
				value[`ObligacionesPendientePago${_myYear}`] = dataIntermedio[0][`ObligacionesPendientePago${_myYear}`];
				value[`RemanenteCredito${_myYear}`] = dataIntermedio[0][`RemanenteCredito${_myYear}`];
			});
			dataFinal.push(value);
			this._rowData = dataFinal;
		});
	}

	// expandAll() {
	// 	this._gridApi.expandAll();
	// 	this.isExpanded = true;
	// }

	// collapseAll() {
	// 	this._gridApi.collapseAll();
	// 	this.isExpanded = false;
	// }

	async _showProgramDetails() {
		this.title = 'Detalle programa ' + this._dataStoreService.selectedCodeRowFirstLevel;
		await this._CalcDataDetails(this._CodFilter);
		this._columnDefs = getColumnDefsDetails(this._avalaibleYearsService, '');
		this._setGridOptions();
		this._gridApi.setRowData(this._rowData);
		this._gridApi.setColumnDefs(this._columnDefs);
		this._gridApi.expandAll();
		this._router.navigateByUrl('/tableProgramaDetails/details');
		this.hasAppPresupuestaria = true;
	}

	async _showAppPresupuestaria() {
		this.buttonExpandirColapsar = false;
		const selectedRow = this.agGrid.api.getSelectedNodes();
		this._hasRowClicked.change(null);
		await this._createAppPresupuestarias();
		await this._filterByAppPresupuestaria(selectedRow[0].data.appPresupuestaria);
		// this._columnDefs = getColumnDefsAppPresupuestaria(this._avalaibleYearsService, this._subHeaderName);
		this._columnDefs = getColumnDefsDetails(this._avalaibleYearsService, 'appPresupuestaria');

		this.autoGroupColumnDef = {
			headerName: 'Aplicación presupuestaria',
			field: 'DesEco',
			width: 625,
			pinned: 'left',
			cellRenderer: CellRendererOCMtext,
			valueGetter: (params) => {
				if (params?.data) {
					return '';
				} else {
					return '';
				}
			}
		};
		this._setGridOptions();
		this.title =
			'Detalle aplicación presupuestária: <br> ' +
			'Prográma: ' +
			selectedRow[0].data.CodPro +
			'-' +
			selectedRow[0].data.DesPro +
			'<br> Económico: ' +
			selectedRow[0].data.CodEco +
			'-' +
			selectedRow[0].data.DesEco;

		this._gridApi.setRowData(this._rowData);
		this._gridApi.setColumnDefs(this._columnDefs);
		this._gridApi.expandAll();
		this._router.navigateByUrl('/tableProgramaDetails/appPresupuestaria');
		this.hasAppPresupuestaria = false;
	}

	volver() {
		this.buttonVisible = true;
		this._dataStoreService.selectedCodeRowFirstLevel = '';
		this._location.back();

		if (this.levelDetails === 1) {
			this._location.back();
		}
		if (this.levelDetails === 2) {
			this._location.back();
			this._location.back();
		}
	}

	ficha() {
		if (this._path === 'details') {
			this._dataStoreFichaProgramaService.setFichaProgramaData(this._rowData);
		} else {
			this._dataStoreFichaProgramaService.setFichaProgramaData(this._rowDataFicha);
		}
		// Update the browser's URL without navigating
		this._location.go('/fichaIndice');
		// this._router.navigate(['/fichaPrograma'], { queryParams: null, queryParamsHandling: 'merge' });
		this._router.navigate(['/fichaIndice']);
	}
}
