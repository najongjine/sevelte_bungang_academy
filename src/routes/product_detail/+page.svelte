<script lang="ts">
	import type { ProductDetail } from '$lib/types/product_type';
	import { user } from '$lib/stores/userStore';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import defaultImage from '$lib/assets/no-image.webp';
	const api = import.meta.env.VITE_SERVER_API_URL;

	export let data: {
		product_idp: number;
	};
	let { product_idp } = data;

	let productData: ProductDetail = {} as ProductDetail;

	$: if (product_idp) {
		fetchProduct();
	}

	async function fetchProduct() {
		try {
			const res = await axios.get(`${api}/api/product/get_product_by_idp`, {
				params: { idp: product_idp }
			});
			const response = res?.data;
			if (!response?.success) {
				console.error('❌ 상품 조회 실패:', response?.message);
				alert(`상품 정보 오류: ${response?.message}`);
				return;
			}
			console.log(`✅ response: `, response);
			productData = response?.data;
			selectedImage = productData?.imgs[0]?.img_url ?? '';
		} catch (error: any) {
			console.error('❌ 상품 조회 실패:', error?.message);
			alert(`상품 정보를 불러오는 중 오류 발생! ${error?.message ?? ''}`);
		}
	}

	let selectedImage = defaultImage;

	function selectImage(image: string) {
		selectedImage = image;
	}
	function addToCart() {
		alert('장바구니에 담겼습니다.');
	}
</script>

<div class="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
	<!-- 이미지 영역 -->
	<div>
		<img
			src={selectedImage}
			alt="대표 이미지"
			class="w-full max-h-[450px] rounded-xl border shadow-md object-contain mx-auto"
		/>

		<div class="flex gap-3 mt-4">
			{#each productData?.imgs as image}
				<img
					src={image?.img_url ?? ''}
					alt="썸네일"
					class="w-20 h-20 rounded-md border hover:shadow-lg cursor-pointer object-cover {selectedImage ===
					image?.img_url
						? 'ring-2 ring-blue-500'
						: ''}"
					on:click={() => selectImage(image?.img_url ?? '')}
				/>
			{/each}
		</div>
	</div>

	<!-- 제품 정보 영역 -->
	<div class="flex flex-col justify-between">
		<div>
			<h1 class="text-3xl font-bold mb-2">{productData?.title}</h1>
			<p class="text-xl text-red-600 font-semibold mb-4">
				{productData?.price?.toLocaleString()}원
			</p>
			<p class="text-gray-600 leading-relaxed">{productData?.content ?? ''}</p>
		</div>

		<button
			class="mt-8 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
			on:click={addToCart}
		>
			🛒 장바구니에 담기
		</button>
	</div>
</div>
