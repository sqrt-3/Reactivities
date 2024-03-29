export interface User {
	displayName: string;
	token: string;
	username: string;
	image?: string;
}

export interface UserFormValues {
	email: string;
	password: string;
	username?: string;
	displayName?: string;
}
