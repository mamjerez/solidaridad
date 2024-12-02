import { Component, inject, input, OnInit } from '@angular/core';

import { SupabaseService } from '@services/supabase.service';

@Component({
	selector: 'app-galeria-fotos',
	standalone: true,
	templateUrl: './galeria-fotos.component.html',
	styleUrl: './galeria-fotos.component.scss'
})
export class GaleriaFotosComponent implements OnInit {
	tag = input.required<string>();
	private readonly _supabaseService = inject(SupabaseService);
	public fotos: { url: string; descripcion: string; id: string; fecha: string }[] = [];

	ngOnInit() {
		this.loadFotosByTag();
	}

	async loadFotosByTag() {
		this.fotos = await this._supabaseService.fetchFotosByTagOrder('laPlata_fotos', this.tag());
	}
}
