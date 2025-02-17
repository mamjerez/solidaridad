// src/app/models/task.model.ts
export interface ITarea {
	id?: number;
	titulo: string;
	descripcion: string;
	responsable: string;
	fecha_inicio: Date;
	fecha_fin: Date;
	status: 'pendiente' | 'en-progreso' | 'completada';
}
