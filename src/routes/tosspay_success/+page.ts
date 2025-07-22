// src/routes/payment/fail/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	return {
		code: url.searchParams.get('code') ?? '',
		message: url.searchParams.get('message') ?? ''
	};
};
