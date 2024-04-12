import { AfterContentInit, Component, ContentChildren, OnDestroy, QueryList, inject } from '@angular/core';
import { NgClass } from '@angular/common';

import { Subject, takeUntil } from 'rxjs';

import { TabComponent } from './tab/tab.component';

import { DataStoreSubtabService } from '@services/dataStoreSubtab.service';
import { DataStoreTabService } from '@services/dataStoreTab.service';

import { ISubtabClasification } from '@interfaces/subtabClasification.interface';
import { ITab } from '@interfaces/tab.interface';

@Component({
	selector: 'app-tabs',
	templateUrl: './tabs.component.html',
	styleUrls: ['./tabs.component.scss'],
	standalone: true,
	imports: [NgClass]
})
export class TabsComponent implements AfterContentInit, OnDestroy {
	private _dataStoreSubtabService = inject(DataStoreSubtabService);
	private _dataStoreTabService = inject(DataStoreTabService);

	@ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
	private _tabSelected: ITab;
	private _subtabSelected: ISubtabClasification;
	private _unsubscribe$ = new Subject<void>();

	constructor() {
		this._dataStoreTabService
			.getTab()
			.pipe(takeUntil(this._unsubscribe$))
			.subscribe((storeTab) => {
				this._tabSelected = storeTab;
			});
	}

	ngAfterContentInit(): void {
		setTimeout(() => {
			this.setActiveTab({
				active: this._tabSelected.selected,
				title: this._tabSelected.title,
				clasification: this._tabSelected.clasificationType,
				isFicha: this._tabSelected.isFicha
			});
		}, 50);
	}

	ngOnDestroy() {
		this._unsubscribe$.next();
		this._unsubscribe$.complete();
	}

	clickTab(tab: TabComponent): void {
		this.setActiveTab(tab);
		this._dataStoreTabService.setTab({
			clasificationType: tab.clasification
		});

		// Tengo que recuperar el subtab seleccionado en el tab actual
		if (!tab.isFicha) {
			switch (tab.clasification) {
				case 'ingresosEconomicaEconomicos':
					this._subtabSelected = this._dataStoreSubtabService.getData1();
					break;
				case 'gastosProgramaProgramas':
					this._subtabSelected = this._dataStoreSubtabService.getData2();
					break;
				case 'gastosOrganicaOrganicos':
					this._subtabSelected = this._dataStoreSubtabService.getData3();
					break;
				case 'gastosEconomicaEconomicos':
					this._subtabSelected = this._dataStoreSubtabService.getData4();
					break;
			}
		}
	}

	private setActiveTab(tab: TabComponent): void {
		this.tabs.toArray().forEach((t) => {
			t.active = t.clasification === tab.clasification;
		});
	}
}
