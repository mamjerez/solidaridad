export interface Project {
	id: number;
	title: string;
	description: string;
	image: string;
	status: 'Presentado' | 'En Progreso' | 'Completado' | 'Planificado';
	progress: number;
}
