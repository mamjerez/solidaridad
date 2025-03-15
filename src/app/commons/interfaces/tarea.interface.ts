// src/app/models/task.model.ts
export interface ITarea {
	id?: number;
	titulo: string;
	descripcion: string;
	responsable: string;
	date?: Date;
	fecha_inicio: Date;
	fecha_fin: Date;
	status: 'pendiente' | 'en-progreso' | 'completada';
	tag: string;
	subtag?: string;
}
