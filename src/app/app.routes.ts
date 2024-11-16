import { Routes } from '@angular/router';

export default [
	{
		path: 'home',
		loadComponent: () => import('./home/home.component')
	},
	{
		path: 'asociaciones',
		loadComponent: () => import('./asociaciones/asociaciones/asociaciones.component')
	},
	{
		path: 'ficha',
		loadComponent: () => import('./asociaciones/ficha/ficha.component')
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

	{ path: '**', pathMatch: 'full', redirectTo: '/home' }
] as Routes;
