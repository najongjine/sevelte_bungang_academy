<script lang="ts">
	import Banner from '$lib/components/Banner.svelte';
	import ProductList from '$lib/components/ProductList.svelte';
	import type { ProductDetail } from '$lib/types/product_type';
	import axios from 'axios';

	const api = import.meta.env.VITE_SERVER_API_URL;

	let products: ProductDetail[] = [];

	const fetchProductList = async () => {
		try {
			let response: any = await axios.get(`${api}/api/product/get_product_list`, {});
			response = response?.data;

			if (!response?.success) {
				alert(`제품정보를 가져오는데 에러가 발생했습니다. ${response?.message ?? ''}`);
				return;
			}
			products = response?.data ?? [];
			console.log(`## on mount products: `, products);
		} catch (err: any) {
			alert(`서버 에러. ${err?.message ?? ''}`);
		} finally {
		}
	};
	fetchProductList();
</script>

<Banner />

{#if products?.length}
	<ProductList {products} />
{:else}
	<p>로딩 중...</p>
{/if}
