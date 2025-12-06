export interface LoginResponse {
	token: string;
	user: {
		email: string;
		name: string;
	};
}
