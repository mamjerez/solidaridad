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
	public id: any;
	public url: any;

	async ngOnInit() {
		const id = this._route.snapshot.paramMap.get('id');
		if (id) {
			try {
				this.foto = await this._supabaseService.fetchDataById('laPlata_fotos', id);
				console.log(this.foto);
				this.id = this.foto[0].id;
				this.url = this.foto[0].url;
			} catch (error) {
				console.error('Error al cargar la foto:', error);
			} finally {
			}
		} else {
			console.error('ID no encontrado en la ruta');
		}
	}
}
