export interface ICard {
	estado?: string;
	funcion?: () => void;
	has_imagen: boolean;
	order?: number;
	rutaImagen?: string;
	tag: string;
	title: string;
}
