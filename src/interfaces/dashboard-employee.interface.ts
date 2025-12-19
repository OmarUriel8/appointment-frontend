import { ServiceMostUsed } from './dashboard-admin.interface';

export interface DashboardEmployee {
	serviceMostUsed: ServiceMostUsed[];
	scoreAverage: ScoreAverage;
	reviewClient: ReviewClient[];
}

export interface ReviewClient {
	comments: string;
	score: number;
}

export interface ScoreAverage {
	average: number;
}
