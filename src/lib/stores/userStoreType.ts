export interface UserRole {
	role_idp: string;
	user_idp: string;
	irole: string;
	created_dt: string; // 또는 Date 타입을 원하면 Date
}

export interface UserType {
	idp: string;
	uid: string;
	email: string;
	displayname: string;
	photourl: string;
	providerid: string;
	created_dt: string;
	updated_dt: string;
	roles: UserRole[]; // JSON 배열 형태로 들어옴
}
