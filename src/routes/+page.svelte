<script lang="ts">
	import Banner from '$lib/components/Banner.svelte';
	import ProductList from '$lib/components/ProductList.svelte';
	import type { ProductDetail } from '$lib/types/product_type';
	import axios from 'axios';

	const api = import.meta.env.VITE_SERVER_API_URL;

	let products: ProductDetail[] = [];
	let page_no = 1;
	let item_limit = 50;
	let guide_msg = '로딩중';

	const fetchProductList = async () => {
		try {
			let response: any = await axios.get(`${api}/api/product/get_product_list`, {
				params: { page_no, item_limit }
			});
			response = response?.data;

			if (!response?.success) {
				alert(`제품정보를 가져오는데 에러가 발생했습니다. ${response?.message ?? ''}`);
				return;
			}
			products = response?.data ?? [];
			if (!products?.length) guide_msg = `데이터가 없습니다.`;
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
	<p>{guide_msg}</p>
{/if}
<br /><br />
<div>
	<button>데이터 더 가져오기</button>
</div>
