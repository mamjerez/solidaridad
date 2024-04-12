import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-card-info',
	standalone: true,
	imports: [],
	templateUrl: './card-info.component.html',
	styleUrls: ['./card-info.component.scss']
})
export class CardInfoComponent {
	@Input() rutaImagen: string;
	@Input() titulo: string;
	@Input() subtitulo: string;
	@Input() textButton: string;
	@Input() textButton1: string;
	@Input() textButton2: string;
	@Input() hover: true;
}
