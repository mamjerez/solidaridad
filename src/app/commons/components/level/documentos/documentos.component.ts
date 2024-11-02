import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
// import { IDoc } from '@interfaces/doc.interface';

@Component({
	selector: 'app-documentos',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './documentos.component.html'
})
export default class DocumentosComponent implements OnInit {
	// TODO: Typar
	@Input() docs: any[];

	public canViewConfidencial = false;

	ngOnInit(): void {
		console.log('this.docs', this.docs);
	}

	admin(): void {
		this.canViewConfidencial = !this.canViewConfidencial;
	}
}
