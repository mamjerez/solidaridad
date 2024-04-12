import { Component } from '@angular/core';

import { CardIndiceComponent } from '@app/commons/components/card/card.component';
import { CheckboxComponent } from '@app/commons/components/checkbox/checkbox.component';
import { SankeyGraphsComponent } from './components/sankey-graphs/sankey-graphs.component';
import { TableDataPresupuestoComponent } from './components/table/table.component';

@Component({
	selector: 'app-vision-global',
	templateUrl: './vision-global.component.html',
	styleUrls: ['./vision-global.component.scss'],
	standalone: true,
	imports: [CardIndiceComponent, CheckboxComponent, TableDataPresupuestoComponent, SankeyGraphsComponent]
})
export default class IndiceComponent {
	items = [
		{
			indice: '1.',
			title: 'La recaudación local',
			footer:
				'Se realiza a través de impuestos directos, como el impuesto de bienes inmuebles (IBI) o el de vehículos de tracción mecánica (IVTM), y de tasas.',
			img: 'assets/img/vision-global/busget-stream-1.webp'
		},
		{
			indice: '2.',
			title: 'Otras fuentes de ingresos',
			footer:
				'El dinero recaudado localmente se complementa con las transferencias de la Administración General del Estado y de la Junta de Andalucía, que son las encargadas de recaudar otros ingresos como el IVA y el IRPF.',
			img: 'assets/img/vision-global/busget-stream-2.webp'
		},
		{
			indice: '3.',
			title: 'Gastos',
			footer:
				'El ayuntamiento utiliza el dinero recaudado, junto con otras fuentes de financiación como la deuda, para mantener los servicios públicos y la infraestructura de la ciudad.',
			img: 'assets/img/vision-global/busget-stream-3.webp'
		}
	];
}
