import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CardMenuComponent } from '@app/commons/components/card-menu/card-menu.component';
@Component({
	selector: 'app-reivindicaciones',
	standalone: true,
	imports: [CardMenuComponent],

	templateUrl: './reivindicaciones.component.html',
	styleUrl: './reivindicaciones.component.scss'
})
export default class ReivindicacionesComponent {
	private _router = inject(Router);
	public rutaBase = 'https://cswdadlxiubwdzvqzywc.supabase.co/storage/v1/object/public/solidaridad/';
	public rutaBaseOCM = 'https://cswdadlxiubwdzvqzywc.supabase.co/storage/v1/object/public/imgTodas/';
	public reivindicaciones: any[] = [
		{
			rutaImagen: `${this.rutaBase}alumbradoPublico.jpg`,
			titulo: 'Alumbrado público',
			path: 'alumbrado'
		},
		{
			rutaImagen: `${this.rutaBase}cementerio.jpg`,
			titulo: 'Cementerio',
			path: 'cementerio'
		},
		{
			rutaImagen: `${this.rutaBase}recogidaResiduos.jpg`,
			titulo: 'Recogida de residuos',
			path: 'recogidaResiduos'
		},
		{
			rutaImagen: `${this.rutaBase}limpiezaViaria.jpg`,
			titulo: 'Limpieza viaria',
			path: 'limpiezaViaria'
		},
		{
			rutaImagen: `${this.rutaBaseOCM}suministroAgua.jpg`,
			titulo: 'Abastecimiento domiciliario de agua potable',
			path: 'abastecimientoAgua'
		},
		{
			rutaImagen: `${this.rutaBase}alcantarillado.jpg`,
			titulo: 'Alcantarillado',
			path: 'alcantarillado'
		},
		{
			rutaImagen: `${this.rutaBase}accesoNucleos.jpg`,
			titulo: 'Acceso a los núcleos de población',
			path: 'accesoNucleos'
		},
		{
			rutaImagen: `${this.rutaBase}pavimentacionVias.jpg`,
			titulo: 'Pavimentación de las vías públicas',
			path: 'pavimentacionVias'
		},
		{
			rutaImagen: `${this.rutaBaseOCM}parques.jpg`,
			titulo: 'Parques públicos',
			path: 'parquePublico'
		},
		{
			rutaImagen: `${this.rutaBase}bibliotecaPublica.jpg`,
			titulo: 'Biblioteca pública',
			path: 'bibliotecaPublica'
		},
		{
			rutaImagen: `${this.rutaBaseOCM}lasCalandrias.jpg`,
			titulo: 'Tratamiento de residuos',
			path: 'tratamientoResiduos'
		},
		{
			rutaImagen: `${this.rutaBase}proteccionCivil.jpg`,
			titulo: 'Protección civil',
			path: 'proteccionCivil'
		},
		{
			rutaImagen: `${this.rutaBase}evaluacionNecesidades.jpg`,
			titulo: 'Evaluación e información de situaciones de necesidad social',
			path: 'evaluacionNecesidades'
		},
		{
			rutaImagen: `${this.rutaBase}extincionIncendios.jpg`,
			titulo: 'Prevención y extinción de incendios',
			path: 'extincionIncendios'
		},
		{
			rutaImagen: `${this.rutaBase}instalacionesDeportivas.jpg`,
			titulo: 'Instalaciones deportivas de uso público',
			path: 'instalacionesDeportivas'
		},
		{
			rutaImagen: `${this.rutaBaseOCM}autobuses.jpg`,
			titulo: 'Transporte colectivo urbano de viajeros',
			path: 'transporteViajeros'
		},
		{
			rutaImagen: `${this.rutaBase}medioAmbiente.jpg`,
			titulo: 'Medio ambiente urbano',
			path: 'medioAmbiente'
		},
		{
			rutaImagen: `${this.rutaBase}medioAmbienteParques.jpg`,
			titulo: 'Medio ambiente urbano: parques y jardines públicos',
			path: 'medioAmbienteParques'
		},
		{
			rutaImagen: `${this.rutaBase}medioAmbienteResiduos.jpg`,
			titulo: 'Medio ambiente urbano: gestión de residuos solidos urbanos',
			path: 'medioAmbienteResiduos'
		},
		{
			rutaImagen: `${this.rutaBase}contaminacion.jpg`,
			titulo: 'Protección contra contaminación acústica, lumínica y atmosferica',
			path: 'contaminacion'
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
