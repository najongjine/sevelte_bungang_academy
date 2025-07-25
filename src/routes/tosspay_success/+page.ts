import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const paymentType = Number(url.searchParams.get('paymentType'));
	const orderId = Number(url.searchParams.get('orderId'));
	const paymentKey = Number(url.searchParams.get('paymentKey'));
	const amount = Number(url.searchParams.get('amount'));

	return {
		paymentType,
		orderId,
		paymentKey,
		amount
	};
};
