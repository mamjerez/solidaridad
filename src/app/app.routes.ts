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
		path: 'asociaciones',
		loadComponent: () => import('./pages/asociaciones/asociaciones/asociaciones.component')
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

	{ path: '**', pathMatch: 'full', redirectTo: '/home' }
] as Routes;
