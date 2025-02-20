import { Component } from '@angular/core';

import InformacionesComponent from '@app/commons/components/informaciones/informaciones.component';
import BotonesAddComponent from '@app/commons/components/botones-add/botones-add.component';

// import { GetNewsComsDocs } from '@services/getNewsComsDocs.service';

// import { ICom } from '@interfaces/com.interface';
// import { IDoc } from '@interfaces/doc.interface';
// import { INew } from '@interfaces/new.interface';
// import { IGestion } from '@interfaces/gestion.interface';

@Component({
	selector: 'app-asta-regia',
	imports: [InformacionesComponent, BotonesAddComponent],
	templateUrl: './asta-regia.component.html',
	styleUrl: './asta-regia.component.scss'
})
export default class AstaRegiaComponent {
	// private readonly router = inject(Router);
	// private _getNewsComsDocs = inject(GetNewsComsDocs);
	// public news: INew[] = [];
	// public coms: ICom[] = [];
	// public docs: IDoc[] = [];
	// public gestiones: IGestion[] = [];
	public tag = 'astaRegia';

	// addCom(): void {
	// 	this.router.navigateByUrl('addCom/' + this.tag);
	// }
}
