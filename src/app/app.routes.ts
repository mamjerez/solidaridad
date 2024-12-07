import { Routes } from '@angular/router';

export default [
	{
		path: 'home',
		loadComponent: () => import('./pages/home/home.component')
	},
	{
		path: 'auth',
		loadComponent: () => import('./pages/auth/auth.component')
	},
	{
		path: 'mision',
		loadComponent: () => import('./pages/mision/mision.component')
	},
	{
		path: 'vision',
		loadComponent: () => import('./pages/vision/vision.component')
	},
	{
		path: 'valores',
		loadComponent: () => import('./pages/valores/valores.component')
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
		path: 'OndaJerezRadio',
		loadComponent: () => import('./pages/onda-jerez-radio/onda-jerez-radio.component')
	},
	{
		path: 'Fecha20241210',
		loadComponent: () => import('./pages/secretarias-reuniones/reuniones/fecha20241210/fecha20241210.component')
	},
	{
		path: 'asociacionesFederadas',
		loadComponent: () => import('./pages/asociaciones-federadas/asociaciones-federadas.component')
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
		path: 'sanEnrique',
		loadComponent: () => import('./pages/asociaciones-federadas/san-enrique/san-enrique.component')
	},
	{
		path: 'laPlata',
		loadComponent: () => import('./pages/asociaciones-federadas/la-plata/la-plata.component')
	},
	{
		path: 'aparcamientoLaPlata',
		loadComponent: () => import('./pages/asociaciones-federadas/la-plata/problemas/aparcamiento/aparcamiento.component')
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
	{
		path: 'resumenPrensa',
		loadComponent: () => import('./pages/resumen-prensa/resumen-prensa.component')
	},
	{
		path: 'addCom/:tag',
		loadComponent: () => import('./addNewRecod/add-com/add-com.component')
	},
	{ path: '**', pathMatch: 'full', redirectTo: '/home' }
] as Routes;
