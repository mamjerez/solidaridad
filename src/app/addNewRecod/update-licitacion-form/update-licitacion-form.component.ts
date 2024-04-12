import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '@services/supabase.service';
import { TagStoreService } from '@services/tagStore.service';

@Component({
	selector: 'app-update-licitacion-form',
	standalone: true,
	imports: [FormsModule, ReactiveFormsModule],
	templateUrl: './update-licitacion-form.component.html',
	styleUrls: ['./update-licitacion-form.component.scss']
})
export default class UpdateLicitacionFormComponent implements OnInit {
	licitacionForm: FormGroup;
	private _formBuilder = inject(FormBuilder);
	private _supabaseService = inject(SupabaseService);
	private _tagStoreService = inject(TagStoreService);
	private _location = inject(Location);

	public tag = this._tagStoreService.getTag();
	data: any[] = [];

	ngOnInit(): void {
		this.fecthLicitacion();
	}

	async fecthLicitacion() {
		try {
			this.data = await this._supabaseService.fetchDataByTag('licitaciones', this.tag);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
		this.fillForm();
	}

	async fillForm() {
		if (this.data.length > 0) {
			this.licitacionForm = this._formBuilder.group({
				tag: [this.tag, Validators.required],
				expediente: [this.data[0].expediente, Validators.required],
				descripcion: [this.data[0].descripcion, Validators.required],
				codigo_cpv: [this.data[0].codigo_cpv],
				url_plataforma: [this.data[0].url_plataforma],
				tipo_financiacion: [this.data[0].tipo_financiacion],
				tipo_contrato: [this.data[0].tipo_contrato],
				procedimiento_contratacion: [this.data[0].procedimiento_contratacion],
				tipo_tramitación: [this.data[0].tipo_tramitación],
				presupuesto_base_sin_impuestos: [this.data[0].presupuesto_base_sin_impuestos],
				valor_estimado_contrato: [this.data[0].valor_estimado_contrato],
				presupuesto_base_licitación_con_impuestos: [this.data[0].presupuesto_base_licitación_con_impuestos],
				plazo_ejecución: [this.data[0].plazo_ejecución],
				licitadores_presentados: [this.data[0].licitadores_presentados],
				adjudicatario: [this.data[0].adjudicatario],
				cif_adjudicatario: [this.data[0].cif_adjudicatario],
				url_adjudicatario: [this.data[0].url_adjudicatario],
				importe_adjudicación_sin_impuestos: [this.data[0].importe_adjudicación_sin_impuestos],
				importe_adjudicación_con_impuestos: [this.data[0].importe_adjudicación_con_impuestos],
				credito_ampara: [this.data[0].credito_ampara],
				organico: [this.data[0].organico],
				programa: [this.data[0].programa],
				economico: [this.data[0].economico],
				distrito: [this.data[0].distrito],
				url_geolocalización: [this.data[0].url_geolocalización],
				duración_contrato: [this.data[0].duración_contrato],
				canon_concesional: [this.data[0].canon_concesional]
			});
		}
	}

	async submitForm(): Promise<void> {
		if (this.licitacionForm?.valid) {
			try {
				await this._supabaseService.updateRow('licitaciones', this.licitacionForm.value, this.licitacionForm.value.tag);
				this._location.back();
			} catch (error) {
				console.error('Error al insertar datos:', error);
			}
		}
	}
}
