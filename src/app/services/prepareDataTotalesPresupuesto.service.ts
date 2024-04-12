import { Injectable, inject } from '@angular/core';

import { DataStoreService } from './dataStore.service';

import { environment } from '@environments/environment';

import { IDataTotalesPresupuesto } from '@interfaces/dataTotalesPresupuesto.interface';

interface ITotalPresupuestoIngresos {
	Definitivas1?: number;
	DerechosReconocidosNetos1?: number;
}
interface ITotalPresupuestoGastos {
	Definitivas1?: number;
	Pagos1?: number;
}

@Injectable({
	providedIn: 'root'
})
export class PrepareDataTotalesPresupuestoService {
	private _dataStoreService = inject(DataStoreService);

	private _totalPresupuestoIngresos: ITotalPresupuestoIngresos;
	private _totalPresupuestoGastos: ITotalPresupuestoGastos;

	calcTotales() {
		this.calcPresupuestoIngresos();
		this.calcPresupuestoGastos();
		this.setTotalesPresupuesto();
	}

	calcPresupuestoIngresos() {
		this._totalPresupuestoIngresos = {};
		const include = ['Definitivas1', 'DerechosReconocidosNetos1'];
		const rowDataIngresos = this._dataStoreService.dataTable.rowDataIngresos;

		// Iterar sobre cada fila de la tabla de datos
		for (const row of rowDataIngresos) {
			// Iterar sobre cada clave del objeto que representa la fila actual
			for (const key in row) {
				// if (!exclude.includes(key)) {
				if (include.includes(key)) {
					// Si la clave no existe en el objeto que almacena el total de ingresos,
					// se inicializa en cero
					if (!this._totalPresupuestoIngresos[key]) {
						this._totalPresupuestoIngresos[key] = 0;
					}
					// Se suma el valor de la clave al total
					this._totalPresupuestoIngresos[key] += row[key];
				}
			}
		}
	}

	async calcPresupuestoGastos() {
		this._totalPresupuestoGastos = {};
		const include = ['Definitivas1', 'Pagos1'];

		for (const row of this._dataStoreService.dataTable.rowDataGastos) {
			for (const key in row) {
				if (include.includes(key)) {
					if (!this._totalPresupuestoGastos[key]) {
						this._totalPresupuestoGastos[key] = 0;
					}
					this._totalPresupuestoGastos[key] += row[key];
				}
			}
		}
	}

	setTotalesPresupuesto() {
		try {
			const DataTotalesPresupuesto: IDataTotalesPresupuesto = {
				year: environment.currentYear.toString(),
				totalPresupuestoIngresos: this._totalPresupuestoIngresos.Definitivas1,
				totalEjecutadoIngresos: this._totalPresupuestoIngresos.DerechosReconocidosNetos1,
				totalPresupuestoGastos: this._totalPresupuestoGastos.Definitivas1,
				totalEjecutadoGastos: this._totalPresupuestoGastos.Pagos1
			};
			this._dataStoreService.dataTotalesPresupuesto = DataTotalesPresupuesto;
		} catch (error) {
			// console.clear();
			// console.error('error------------------- ', error);
			// console.log(this._totalPresupuestoIngresos);
			// console.log(this._totalPresupuestoGastos);
		}
	}
}
