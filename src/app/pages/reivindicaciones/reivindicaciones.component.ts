import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';

interface IReivindicacion {
	rutaImagen: string;
	titulo: string;
	tag: string;
}

@Component({
	selector: 'app-reivindicaciones',

	imports: [CardMenuComponent],
	templateUrl: './reivindicaciones.component.html',
	styleUrl: './reivindicaciones.component.scss'
})
export default class ReivindicacionesComponent {
	private _router = inject(Router);
	public rutaBase = 'https://cswdadlxiubwdzvqzywc.supabase.co/storage/v1/object/public/solidaridad/';
	public rutaBaseOCM = 'https://cswdadlxiubwdzvqzywc.supabase.co/storage/v1/object/public/imgTodas/';
	public reivindicaciones: IReivindicacion[] = [
		{
			rutaImagen: `${this.rutaBase}alumbradoPublico.jpg`,
			titulo: 'Alumbrado público',
			tag: 'alumbrado'
		},
		{
			rutaImagen: `${this.rutaBase}cementerio.jpg`,
			titulo: 'Cementerio',
			tag: 'cementerio'
		},
		{
			rutaImagen: `${this.rutaBase}recogidaResiduos.jpg`,
			titulo: 'Recogida de residuos',
			tag: 'recogidaResiduos'
		},
		{
			rutaImagen: `${this.rutaBase}limpiezaViaria.jpg`,
			titulo: 'Limpieza viaria',
			tag: 'limpiezaViaria'
		},
		{
			rutaImagen: `${this.rutaBaseOCM}suministroAgua.jpg`,
			titulo: 'Abastecimiento domiciliario de agua potable',
			tag: 'abastecimientoAgua'
		},
		{
			rutaImagen: `${this.rutaBase}alcantarillado.jpg`,
			titulo: 'Alcantarillado',
			tag: 'alcantarillado'
		},
		{
			rutaImagen: `${this.rutaBase}accesoNucleos.jpg`,
			titulo: 'Acceso a los núcleos de población',
			tag: 'accesoNucleos'
		},
		{
			rutaImagen: `${this.rutaBase}pavimentacionVias.jpg`,
			titulo: 'Pavimentación de las vías públicas',
			tag: 'pavimentacionVias'
		},
		{
			rutaImagen: `${this.rutaBaseOCM}parques.jpg`,
			titulo: 'Parques públicos',
			tag: 'parquePublico'
		},
		{
			rutaImagen: `${this.rutaBase}bibliotecaPublica.jpg`,
			titulo: 'Biblioteca pública',
			tag: 'bibliotecaPublica'
		},
		{
			rutaImagen: `${this.rutaBaseOCM}lasCalandrias.jpg`,
			titulo: 'Tratamiento de residuos',
			tag: 'tratamientoResiduos'
		},
		{
			rutaImagen: `${this.rutaBase}proteccionCivil.jpg`,
			titulo: 'Protección civil',
			tag: 'proteccionCivil'
		},
		{
			rutaImagen: `${this.rutaBase}evaluacionNecesidades.jpg`,
			titulo: 'Evaluación e información de situaciones de necesidad social',
			tag: 'evaluacionNecesidades'
		},
		{
			rutaImagen: `${this.rutaBase}extincionIncendios.jpg`,
			titulo: 'Prevención y extinción de incendios',
			tag: 'extincionIncendios'
		},
		{
			rutaImagen: `${this.rutaBase}instalacionesDeportivas.jpg`,
			titulo: 'Instalaciones deportivas de uso público',
			tag: 'instalacionesDeportivas'
		},
		{
			rutaImagen: `${this.rutaBaseOCM}autobuses.jpg`,
			titulo: 'Transporte colectivo urbano de viajeros',
			tag: 'transporteViajeros'
		},
		{
			rutaImagen: `${this.rutaBase}medioAmbiente.jpg`,
			titulo: 'Medio ambiente urbano',
			tag: 'medioAmbiente'
		},
		{
			rutaImagen: `${this.rutaBase}medioAmbienteParques.jpg`,
			titulo: 'Medio ambiente urbano: parques y jardines públicos',
			tag: 'medioAmbienteParques'
		},
		{
			rutaImagen: `${this.rutaBase}medioAmbienteResiduos.jpg`,
			titulo: 'Medio ambiente urbano: gestión de residuos solidos urbanos',
			tag: 'medioAmbienteResiduos'
		},
		{
			rutaImagen: `${this.rutaBase}contaminacion.jpg`,
			titulo: 'Protección contra contaminación acústica, lumínica y atmosferica',
			tag: 'contaminacion'
		}
	];

	navigateTo(tag: string) {
		if (tag.startsWith('http')) {
			window.open(tag, '_blank');
		} else {
			const URL = `reivindicaciones/${tag}`;
			this._router.navigateByUrl(URL);
		}
	}
}
