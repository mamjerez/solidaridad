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
	// Art 10 ============================================================================================================================================
	{
		path: 'retribuciones2022',
		loadComponent: () =>
			import(
				'./art10/components/info-organizativa/components/empleados/components/retribuciones2022/retribuciones2022.component'
			)
	},
	{
		path: 'rpt',
		loadComponent: () =>
			import('./art10/components/info-organizativa/components/empleados/components/rpt/rpt.component')
	},
	{
		path: 'organigramaPolitico',
		loadComponent: () => import('./organigrama/politico/organigrama-politico.component')
	},
	{
		path: 'fichaPolitico/:id',
		loadComponent: () => import('./organigrama/ficha-politico/ficha-politico.component')
	},
	{
		path: 'organigramaOrganizativo',
		loadComponent: () => import('./organigrama/organizativo/organigrama-organizativo.component')
	},
	{
		path: 'fichaEmpleado/:id',
		loadComponent: () => import('./organigrama/ficha-empleado/ficha-empleado.component')
	},
	{
		path: 'ficha-entidad-organizativa/:id',
		loadComponent: () => import('./organigrama/ficha-entidad-organizativa/ficha-entidad-organizativa.component')
	},
	// Art 15 ============================================================================================================================================
	{
		path: 'licitaciones',
		loadComponent: () => import('./art15/components/licitaciones/licitaciones.component')
	},
	{
		path: 'licitaciones/:tag',
		loadComponent: () => import('./level-last/level-last.component')
	},
	{
		path: 'subvenciones',
		loadComponent: () => import('./art15/components/subvenciones/subvenciones.component')
	},
	{
		path: 'subvencionesDiputacion',
		loadComponent: () => import('./art15/components/subvenciones/components/subvencion/subvencion.component')
	},

	// Art 16 ============================================================================================================================================
	{
		path: 'presupuestos',
		loadComponent: () => import('./art16/components/presupuestos/presupuestos.component')
	},
	{
		path: 'visionGlobal',
		loadComponent: () => import('./art16/components/presupuestos/components/vision-global/vision-global.component')
	},
	{
		path: 'detalle',
		loadComponent: () => import('./art16/components/presupuestos/components/detalle/detalle.component')
	},
	{
		path: 'fichaIndice',
		loadComponent: () =>
			import(
				'./art16/components/presupuestos/components/detalle/components/table-programa-details/components/ficha-indice/ficha-indice.component'
			)
	},
	{
		path: 'fichaPresupuesto',
		loadComponent: () =>
			import(
				'./art16/components/presupuestos/components/detalle/components/table-programa-details/components/ficha-presupuesto/ficha-presupuesto.component'
			)
	},
	{
		path: 'fichaGastos',
		loadComponent: () =>
			import(
				'./art16/components/presupuestos/components/detalle/components/table-programa-details/components/ficha-gastos/ficha-gastos.component'
			)
	},
	{
		path: 'fichaRemanentes',
		loadComponent: () =>
			import(
				'./art16/components/presupuestos/components/detalle/components/table-programa-details/components/ficha-remanentes-credito/ficha-remanentes-credito.component'
			)
	},
	{
		path: 'fichaNews',
		loadComponent: () =>
			import(
				'./art16/components/presupuestos/components/detalle/components/table-programa-details/components/ficha-news/ficha-news.component'
			)
	},
	{
		path: 'fichaNews/:codigo',
		loadComponent: () =>
			import(
				'./art16/components/presupuestos/components/detalle/components/table-programa-details/components/ficha-news/ficha-news.component'
			)
	},
	{
		path: 'tableProgramaDetails/:origen',
		loadComponent: () =>
			import(
				'./art16/components/presupuestos/components/detalle/components/table-programa-details/table-programa-details.component'
			)
	},
	{
		path: 'graphDetalle',
		loadComponent: () =>
			import('./art16/components/presupuestos/components/detalle/components/graph-detalle/graph-detalle.component')
	},
	{
		path: 'infoPrograma/:tag',
		loadComponent: () =>
			import('./art16/components/presupuestos/components/detalle/components/info-programa/info-programa.component')
	},
	{
		path: 'documentos/:tag',
		loadComponent: () =>
			import('./art16/components/presupuestos/components/detalle/components/documentos/documentos.component')
	},
	{
		path: 'comentarios/:tag',
		loadComponent: () =>
			import('./art16/components/presupuestos/components/detalle/components/comentarios/comentarios.component')
	},
	{
		path: 'fichaEmpleados',
		loadComponent: () =>
			import(
				'./art16/components/presupuestos/components/detalle/components/table-programa-details/components/ficha-personal/ficha-personal.component'
			)
	},
	{
		path: 'explicamos',
		loadComponent: () => import('./explicamos/explicamos.component')
	},
	{
		path: 'glosario',
		loadComponent: () => import('./glosario/glosario.component')
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
	{
		path: 'addNewLicitacion',
		loadComponent: () => import('./addNewRecod/add-licitacion/add-licitacion.component')
	},
	{
		path: 'updateLicitacion/:tag',
		loadComponent: () => import('./addNewRecod/update-licitacion-form/update-licitacion-form.component')
	},
	{
		path: 'addStep/:tag',
		loadComponent: () => import('./addNewRecod/add-step/add-step.component')
	},
	{
		path: 'addEmpleado',
		loadComponent: () => import('./addNewRecod/empleado/empleado.component')
	},
	{ path: '**', pathMatch: 'full', redirectTo: '/home' }
] as Routes;
