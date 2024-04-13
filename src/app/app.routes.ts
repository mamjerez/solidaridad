import { Routes } from '@angular/router';

export default [
	{
		path: 'home',
		loadComponent: () => import('./home/home.component')
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
		path: 'asociaciones',
		loadComponent: () => import('./asociaciones/asociaciones/asociaciones.component')
	},
	{
		path: 'ficha/:id',
		loadComponent: () => import('./asociaciones/ficha/ficha/ficha.component')
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
