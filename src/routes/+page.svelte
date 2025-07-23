<script lang="ts">
	import Banner from '$lib/components/Banner.svelte';
	import ProductList from '$lib/components/ProductList.svelte';
	import axios from 'axios';

	let products: any[] = [];

	const fetchProductList = async () => {
		try {
			const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
			products = response?.data;
			console.log(`## products:`, products);
		} catch (err: any) {
			alert(`서버 에러. ${err?.message ?? ''}`);
		} finally {
		}
	};

	fetchProductList();
</script>

<Banner />

<ProductList {products} />
