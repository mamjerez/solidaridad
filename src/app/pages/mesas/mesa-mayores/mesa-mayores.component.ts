import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BotonesAddComponent } from '@app/commons/components/botones-add/botones-add.component';
import { InformacionesComponent } from '@app/commons/components/informaciones/informaciones.component';
import CargosComponent from '@app/pages/asociaciones/cargos/cargos.component';

import { SupabaseService } from '@services/supabase.service';

import { ICargo } from '@interfaces/cargo.interface';

@Component({
	selector: 'app-mayores',
	imports: [InformacionesComponent, BotonesAddComponent, CargosComponent],
	templateUrl: './mesa-mayores.component.html',
	styleUrl: './mesa-mayores.component.scss'
})
export default class MesaMayoresComponent implements OnInit {
	private readonly router = inject(Router);
	private readonly _supabaseService = inject(SupabaseService);
	public tag = 'mesaMayores';
	public cargos: ICargo[] = [];

	ngOnInit(): void {
		this.completaCargos();
	}

	addCom(): void {
		this.router.navigateByUrl('addCom/' + this.tag);
	}

	async completaCargos() {
		// Uso Funtion
		this.cargos = await this._supabaseService.obtenerCargosByComision(1);
		console.log('cargos', this.cargos);
	}
}
