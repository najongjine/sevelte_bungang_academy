import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	const paymentType = String(url.searchParams.get('paymentType'));
	const orderId = String(url.searchParams.get('orderId'));
	const paymentKey = String(url.searchParams.get('paymentKey'));
	const amount = Number(url.searchParams.get('amount'));

	return {
		paymentType,
		orderId,
		paymentKey,
		amount
	};
};
