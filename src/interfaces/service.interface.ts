// Interfaz para la respuesta de la API
export interface ApiServiceImage {
	id: string;
	url: string;
}

export interface ApiService {
	id: string;
	name: string;
	description: string;
	slug: string;
	price: number;
	durationMinutes: number;
	tags: string[];
	isActive: boolean;
	images: ApiServiceImage[];
}

export interface ServicesResponse {
	total: number;
	page: number;
	services: ApiService[];
}

export interface ServicesPagination {
	total: number;
	totalPages: number;
	services: Service[];
}

// Interfaz para el frontend (transformada)
export interface Service {
	id: string;
	name: string;
	description: string;
	price: number;
	duration: number;
	images: string[];
	tags: string[];
	slug?: string;
}
