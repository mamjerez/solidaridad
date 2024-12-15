import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '@services/supabase.service';

@Component({
	selector: 'app-detalle-foto',
	standalone: true,
	imports: [],
	templateUrl: './detalle-foto.component.html',
	styleUrl: './detalle-foto.component.scss'
})
export default class DetalleFotoComponent implements OnInit {
	private readonly _route = inject(ActivatedRoute);
	private readonly _supabaseService = inject(SupabaseService);
	public foto: { url: string; descripcion: string; id: string; fecha: string } | null = null;

	async ngOnInit() {
		const id = this._route.snapshot.paramMap.get('id');
		if (id) {
			const data = await this._supabaseService.fetchDataById('laPlata_fotos', id);
			this.foto = data[0];
		} else {
			console.error('ID no encontrado en la ruta');
		}
	}
}
