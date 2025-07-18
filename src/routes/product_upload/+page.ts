// +page.ts
export function load({ url }) {
	const product_idp = Number(url.searchParams.get('product_idp') ?? 0);
	const category_idp = Number(url.searchParams.get('category_idp') ?? 0);

	return {
		product_idp,
		category_idp
	};
}
