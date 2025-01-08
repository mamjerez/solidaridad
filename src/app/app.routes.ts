import { Routes } from '@angular/router';

export default [
	{
		path: 'home',
		loadComponent: () => import('./pages/home/home.component')
	},
	{
		path: 'avisoLegal',
		loadComponent: () => import('./pages/aviso-legal/aviso-legal.component')
	},
	{
		path: 'auth',
		loadComponent: () => import('./pages/auth/auth.component')
	},
	{
		path: 'cuentas',
		loadComponent: () => import('./pages/cuentas/cuentas.component')
	},
	{
		path: 'asociaciones',
		loadComponent: () => import('./pages/asociaciones/asociaciones/asociaciones.component')
	},
	{
		path: 'secretarias',
		loadComponent: () => import('./pages/secretarias/secretarias.component')
	},
	{
		path: 'secretariasReuniones',
		loadComponent: () => import('./pages/secretarias-reuniones/secretarias-reuniones.component')
	},

	{
		path: 'secretariasReunionesOtrasEntidades',
		loadComponent: () =>
			import('./pages/secretarias-reuniones/reuniones-otras-entidades/reuniones-otras-entidades.component')
	},
	{
		path: 'OndaJerezRadio',
		loadComponent: () => import('./pages/onda-jerez-radio/onda-jerez-radio.component')
	},
	{
		path: 'intervencionOndaJerez',
		loadComponent: () => import('./commons/components/intervencion-onda-jerez/intervencion-onda-jerez.component')
	},

	{
		path: 'Fecha20241210',
		loadComponent: () => import('./pages/secretarias-reuniones/reuniones/fecha20241210/fecha20241210.component')
	},
	{
		path: 'Fecha20250107',
		loadComponent: () => import('./pages/secretarias-reuniones/reuniones/fecha20250107/fecha20250107.component')
	},
	{
		path: 'asociacionesFederadas',
		loadComponent: () => import('./pages/asociaciones-federadas/asociaciones-federadas.component')
	},
	{
		path: 'mesas',
		loadComponent: () => import('./pages/mesas/mesas.component')
	},
	{
		path: 'mesaTurismo',
		loadComponent: () => import('./pages/mesas/mesa-turismo/mesa-turismo.component')
	},
	{
		path: 'mesaMayores',
		loadComponent: () => import('./pages/mesas/mesa-mayores/mesa-mayores.component')
	},
	{
		path: 'mesaSeguridad',
		loadComponent: () => import('./pages/mesas/mesa-seguridad/mesa-seguridad.component')
	},
	{
		path: 'mesaCentroHistorico',
		loadComponent: () => import('./pages/mesas/mesa-centro-historico/mesa-centro-historico.component')
	},
	{
		path: 'consejoSocial',
		loadComponent: () => import('./pages/mesas/consejo-social/consejo-social.component')
	},
	{
		path: 'plataformas',
		loadComponent: () => import('./pages/plataformas/plataformas.component')
	},
	{
		path: 'amigosCartuja',
		loadComponent: () => import('./pages/plataformas/amigos-cartuja/amigos-cartuja.component')
	},
	{
		path: 'astaRegia',
		loadComponent: () => import('./pages/plataformas/asta-regia/asta-regia.component')
	},
	{
		path: 'a2003',
		loadComponent: () => import('./pages/plataformas/a2003/a2003.component')
	},
	{
		path: 'a2004',
		loadComponent: () => import('./pages/plataformas/a2004/a2004.component')
	},
	{
		path: 'reivindicaciones',
		loadComponent: () => import('./pages/reivindicaciones/reivindicaciones.component')
	},
	{
		path: 'reivindicaciones/:tag',
		loadComponent: () => import('./pages/reivindicaciones/reivindicacion/reivindicacion.component')
	},
	// {
	// 	path: 'pageAsociacion',
	// 	loadComponent: () => import('./pages/asociaciones-federadas/pagina/page-asociacion.component')
	// },
	{
		path: 'p/:tag',
		loadComponent: () => import('./pages/asociaciones-federadas/pagina/page-asociacion.component')
	},
	{
		path: 'problema',
		loadComponent: () => import('./pages/asociaciones-federadas/problema/problema.component')
	},
	{
		path: 'actividad',
		loadComponent: () => import('./pages/asociaciones-federadas/actividad/actividad.component')
	},

	{
		path: 'fotosHistoricas',
		loadComponent: () => import('./pages/asociaciones-federadas/historia/fotos-historicas/fotos-historicas.component')
	},
	{
		path: 'historiaBarrio',
		loadComponent: () => import('./pages/asociaciones-federadas/historia/datos-historicos/datos-historicos.component')
	},
	{
		path: 'personas',
		loadComponent: () => import('./pages/asociaciones-federadas/historia/personas/personas.component')
	},
	{
		path: 'familias',
		loadComponent: () =>
			import('./pages/asociaciones-federadas/historia/familias-historicas/familias-historicas.component')
	},
	{
		path: 'detalle-foto/:id',
		loadComponent: () => import('./commons/components/galeria-fotos/detalle-foto/detalle-foto.component')
	},
	{
		path: 'ficha',
		loadComponent: () => import('./pages/asociaciones/ficha/ficha.component')
	},
	{
		path: 'quienesSomos',
		loadComponent: () => import('./pages/quienes-somos/quienes-somos.component')
	},
	{
		path: 'proyectos',
		loadComponent: () => import('./pages/proyectos/proyectos.component')
	},
	{
		path: 'historia',
		loadComponent: () => import('./pages/historia/historia.component')
	},
	{
		path: 'contacto',
		loadComponent: () => import('./pages/contacto/contacto.component')
	},
	// {
	// 	path: 'resumenPrensa',
	// 	loadComponent: () => import('./pages/resumen-prensa/resumen-prensa.component')
	// },
	{
		path: 'resumenPrensa',
		loadComponent: () => import('./pages/resumen-prensa-paginado/resumen-prensa-paginado.component')
	},
	{
		path: 'addCom/:tag',
		loadComponent: () => import('./addNewRecod/add-com/add-com.component')
	},
	{
		path: 'addDoc/:tag',
		loadComponent: () => import('./addNewRecod/add-doc/add-doc.component')
	},
	{
		path: 'addNew/:tag',
		loadComponent: () => import('./addNewRecod/add-new/add-new.component')
	},
	{
		path: 'addGestion/:tag',
		loadComponent: () => import('./addNewRecod/add-gestion/add-gestion.component')
	},
	{
		path: 'addCargo/:tag',
		loadComponent: () => import('./addNewRecod/add-cargo/add-cargo.component')
	},
	{
		path: 'addFoto/:tag',
		loadComponent: () => import('./addNewRecod/add-foto/add-foto.component')
	},
	{ path: '**', pathMatch: 'full', redirectTo: '/home' }
] as Routes;
