import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const product_idp = String(url.searchParams.get('product_idp'));
	const user_idp = String(url.searchParams.get('user_idp'));
	const amount = Number(url.searchParams.get('amount'));
	const title = String(url.searchParams.get('title'));

	return {
		product_idp,
		user_idp,
		amount,
		title
	};
};
