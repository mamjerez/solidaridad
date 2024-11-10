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
		path: 'quienesSomos',
		loadComponent: () => import('./pages/quienes-somos/quienes-somos.component')
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
		path: 'level1/:tag',
		loadComponent: () => import('./level1/level1.component')
	},
	{
		path: 'level2/:tag',
		loadComponent: () => import('./level2/level2.component')
	},
	{
		path: 'level3/:tag',
		loadComponent: () => import('./level3/level3.component')
	},
	{
		path: 'levelLast/:tag',
		loadComponent: () => import('./level-last/level-last.component')
	},

	{
		path: 'federaciones',
		loadComponent: () => import('./federaciones/federaciones.component')
	},
	{
		path: 'ficha',
		loadComponent: () => import('./asociaciones/ficha/ficha.component')
	},

	{
		path: 'addNew/:tag',
		loadComponent: () => import('./addNewRecod/add-new/add-new.component')
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
		path: 'addCard/:tag',
		loadComponent: () => import('./addNewRecod/add-card/add-card.component')
	},
	{ path: '**', pathMatch: 'full', redirectTo: '/home' }
] as Routes;
