export interface DashboardAdmin {
	serviceMostUsed: ServiceMostUsed[];
	clientMostVisited: ClientMostVisited[];
	appointmentCompleted: AppointmentCompleted;
	appointmentCanceled: AppointmentCanceled;
}

export interface AppointmentCompleted {
	total: number;
	count: number;
	average: number;
	averageScore: number;
}

export interface AppointmentCanceled {
	total: number;
	count: number;
	average: number;
	percentage: number;
}

export interface ClientMostVisited {
	id: string;
	name: string;
	email?: string;
	total: number;
}

export interface ServiceMostUsed {
	id: string;
	name: string;
	total: number;
}
