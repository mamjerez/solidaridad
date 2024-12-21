import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '@services/supabase.service';
import { BotonesAddComponent } from '../../botones-add/botones-add.component';
import ComentariosComponent from '../../comentarios/comentarios.component';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-detalle-foto',

	imports: [ComentariosComponent, BotonesAddComponent, DatePipe],

	templateUrl: './detalle-foto.component.html',
	styleUrl: './detalle-foto.component.scss'
})
export default class DetalleFotoComponent implements OnInit {
	private readonly _route = inject(ActivatedRoute);
	private readonly _supabaseService = inject(SupabaseService);
	public foto: { url: string; descripcion: string; id: string; fecha: string } | null = null;
	public tag = '';
	public coms: [] = [];

	async ngOnInit() {
		const id = this._route.snapshot.paramMap.get('id');
		if (id) {
			const data = await this._supabaseService.fetchDataById('laPlata_fotos', id);
			this.foto = data[0];
			this.tag = this.foto.id;
		} else {
			console.error('ID no encontrado en la ruta');
		}
		this.cargarComentarios();
	}

	async cargarComentarios() {
		this.coms = await this._supabaseService.fetchDataByTag('solidaridad_comentarios', this.tag);
	}
}
