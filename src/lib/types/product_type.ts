export type ProductImage = {
	img_idp: number;
	img_url: string;
	product_idp: number;
	created_dt: string; // ISO Date
};

export type ProductDetail = {
	idp: number;
	title: string;
	content: string;
	price: number;
	category_idp: number;
	created_dt: string; // ISO Date
	updated_dt: string; // ISO Date
	category_name: string;
	imgs: ProductImage[];
};
