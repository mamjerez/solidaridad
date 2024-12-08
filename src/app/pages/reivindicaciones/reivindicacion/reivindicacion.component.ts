import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformacionesComponent } from '@app/commons/components/informaciones/informaciones.component';
import { SupabaseService } from '@services/supabase.service';

@Component({
	selector: 'app-limpieza-viaria',
	standalone: true,
	imports: [InformacionesComponent],
	templateUrl: './reivindicacion.component.html',
	styleUrl: './reivindicacion.component.scss'
})
export default class LimpiezaViariaComponent implements OnInit {
	@Input() tag: string;
	private readonly _supabaseService = inject(SupabaseService);
	private readonly router = inject(Router);
	public reivindicacion: any;

	ngOnInit(): void {
		this.fecthData();
	}

	async fecthData() {
		try {
			this.reivindicacion = await this._supabaseService.fetchDataByTag('solidaridad_reivindicaciones', this.tag);
		} catch (error) {
			console.error('Error fetching licitaciones:', error);
		}
	}

	addCom(): void {
		console.log(this.tag);
		this.router.navigateByUrl('addCom/' + this.tag);
	}
}
