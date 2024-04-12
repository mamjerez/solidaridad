import { Injectable, inject } from '@angular/core';

import { DataStoreService } from './dataStore.service';
import { PrepareDataGastosService } from './prepareDataGastos.service';
import { PrepareDataIngresosService } from './prepareDataIngresos.service';

import { CLASIFICATION_TYPE } from '@appTypes/clasification.type';
import { getClasificacion } from '@app/data-table';
import { IDataProperty, IDataTable } from '@interfaces/dataTable.interface';

@Injectable({
	providedIn: 'root'
})
export class TableService {
	private _dataStoreService = inject(DataStoreService);
	private _prepareDataGastosService = inject(PrepareDataGastosService);
	private _prepareDataIngresosService = inject(PrepareDataIngresosService);

	async loadData(tipoClasificacion?: CLASIFICATION_TYPE): Promise<IDataTable> {
		// const _startTime = performance.now();

		const rowDataIngresos = await this._prepareDataIngresosService.getDataAllYear();
		const rowDataGastos = await this._prepareDataGastosService.getDataAllYear();
		const dataPropertyTable = getClasificacion(tipoClasificacion) as IDataProperty;
		const sendDataTable: IDataTable = {
			dataPropertyTable,
			clasificationType: tipoClasificacion,
			rowDataIngresos,
			rowDataGastos
		};

		// const endTime = performance.now();
		// console.log(`Tiempo empleado para generar data: ${Math.round(endTime - _startTime)} ms`);

		this._dataStoreService.dataTable = sendDataTable;
		return sendDataTable;
	}
}
