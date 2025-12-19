import { ServiceMostUsed } from './dashboard-admin.interface';

export interface DashboardClient {
	appointmentCompleted: Count;
	appointmentPending: Count;
	serviceMostUsed: ServiceMostUsed[];
}

export interface Count {
	count: number;
}
