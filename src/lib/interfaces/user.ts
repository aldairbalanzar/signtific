export type IGoogleUserMetaData = {
	avatar_url: string;
	email: string;
	email_verified: string;
	full_name: string;
	iss: string;
	name: string;
	phone_verified: boolean;
	picture: string;
	provider_id: string;
	sub: string;
};

export interface IUser {
	id: string;
	email: string;
	is_admin: boolean;
	raw_user_meta_data: IGoogleUserMetaData;
	role: string;
	created_at: string;
}
