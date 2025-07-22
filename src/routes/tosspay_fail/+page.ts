import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	return {
		paymentKey: url.searchParams.get('paymentKey'),
		orderId: url.searchParams.get('orderId'),
		amount: url.searchParams.get('amount')
	};
};
