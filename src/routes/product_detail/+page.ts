import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const product_idp = Number(url.searchParams.get('product_idp'));
	return {
		product_idp
	};
};
