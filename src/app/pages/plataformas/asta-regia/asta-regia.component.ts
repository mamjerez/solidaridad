import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformacionesComponent } from '@app/commons/components/informaciones/informaciones.component';
import { GetNewsComsDocs } from '@services/getNewsComsDocs.service';

import { ICom } from '@interfaces/com.interface';
import { IDoc } from '@interfaces/doc.interface';
import { INew } from '@interfaces/new.interface';
import { IGestion } from '@interfaces/gestion.interface';
import NoticiasComponent from '@app/commons/components/noticias/noticias.component';

@Component({
	selector: 'app-asta-regia',
	standalone: true,
	imports: [InformacionesComponent, NoticiasComponent],

	templateUrl: './asta-regia.component.html',
	styleUrl: './asta-regia.component.scss'
})
export default class AstaRegiaComponent implements OnInit {
	private readonly router = inject(Router);
	private _getNewsComsDocs = inject(GetNewsComsDocs);
	public news: INew[] = [];
	public coms: ICom[] = [];
	public docs: IDoc[] = [];
	public gestiones: IGestion[] = [];

	public tag = 'astaRegia';

	ngOnInit(): void {
		this.fetchData();
	}

	async fetchData() {
		[this.news, this.coms, this.docs, this.gestiones] = await this._getNewsComsDocs.fetchDatPlataformas('astaRegia');
	}

	addCom(): void {
		this.router.navigateByUrl('addCom/' + this.tag);
	}
}
