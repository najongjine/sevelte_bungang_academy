import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const product_idp = Number(url.searchParams.get('product_idp'));
	const category_idp = Number(url.searchParams.get('category_idp'));

	return {
		product_idp,
		category_idp
	};
};
