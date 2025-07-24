<script lang="ts">
	export let id: string;

	const product = {
		id,
		name: '멋진 티셔츠',
		price: 39000,
		description: '편하고 멋진 데일리 티셔츠입니다.',
		images: ['/images/product1-1.jpg', '/images/product1-2.jpg', '/images/product1-3.jpg']
	};

	let selectedImage = product.images[0];

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
			class="w-full rounded-xl border shadow-md aspect-square object-cover"
		/>

		<div class="flex gap-3 mt-4">
			{#each product.images as image}
				<img
					src={image}
					alt="썸네일"
					class="w-20 h-20 rounded-md border hover:shadow-lg cursor-pointer object-cover {selectedImage ===
					image
						? 'ring-2 ring-blue-500'
						: ''}"
					on:click={() => selectImage(image)}
				/>
			{/each}
		</div>
	</div>

	<!-- 제품 정보 영역 -->
	<div class="flex flex-col justify-between">
		<div>
			<h1 class="text-3xl font-bold mb-2">{product.name}</h1>
			<p class="text-xl text-red-600 font-semibold mb-4">{product.price.toLocaleString()}원</p>
			<p class="text-gray-600 leading-relaxed">{product.description}</p>
		</div>

		<button
			class="mt-8 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
			on:click={addToCart}
		>
			🛒 장바구니에 담기
		</button>
	</div>
</div>
