import { DatePipe } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SupabaseService } from '@services/supabase.service';

@Component({
	selector: 'app-galeria-fotos',
	imports: [DatePipe],
	templateUrl: './galeria-fotos.component.html',
	styleUrl: './galeria-fotos.component.scss'
})
export class GaleriaFotosComponent implements OnInit {
	tag = input.required<string>();
	private readonly _supabaseService = inject(SupabaseService);
	private readonly _router = inject(Router);
	public fotos: { url: string; descripcion: string; id: string; fecha: string }[] = [];

	ngOnInit() {
		this.loadFotosByTag();
	}

	async loadFotosByTag() {
		// this.fotos = await this._supabaseService.fetchFotosByTagOrder('laPlata_fotos', this.tag());
		this.fotos = await this._supabaseService.fetchFotosByTagOrder('solidaridad_asociaciones_fotos', this.tag());
	}

	irADetalleFoto(id: string) {
		this._router.navigate(['/detalle-foto', id]);
	}
}
