<script lang="ts">
	//import { VITE_SERVER_API_URL } from '$env/static/private';
	import type { ProductDetail } from '$lib/types/product_type';
	import { user } from '$lib/stores/userStore';
	import axios from 'axios';
	import { goto } from '$app/navigation';

	const api = import.meta.env.VITE_SERVER_API_URL;
	// load 함수에서 전달받은 데이터. query string 사용 방법
	export let data: {
		product_idp: number;
		category_idp: number;
	};
	let { product_idp, category_idp } = data;

	let productName = '';
	let productDescription = '';
	let price = 0;
	let images: File[] = [];
	let imagePreviews: string[] = [];

	let productDataFromServer: ProductDetail | null = null;

	$: if (!category_idp) {
		category_idp = 4;
	}
	$: if (product_idp) {
		fetchProduct();
	}

	async function fetchCategories() {
		try {
			const res = await axios.get(`${api}/api/product/get_category_list`, {});
			const response = res?.data;
			if (!response?.success) {
				console.error('❌ 카테고리 가져오기 실패:', response?.message);
				alert(`카테고리 가져오기 오류: ${response?.message}`);
				return;
			}
			console.log(`✅ response: `, response);
			//[{"idp":4,"category_name":"먹이"}
			productDataFromServer = response?.data;
			if (productDataFromServer) {
				productName = productDataFromServer.title;
				productDescription = productDataFromServer.content;
				price = productDataFromServer.price;
				await initImagesFromServer(productDataFromServer); // ✅ 이미지 초기화
			}
		} catch (error: any) {
			console.error('❌ 상품 조회 실패:', error?.message);
			alert(`상품 정보를 불러오는 중 오류 발생! ${error?.message ?? ''}`);
		}
	}

	async function fetchProduct() {
		try {
			console.log(`## product_idp: ${product_idp}`);
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
			productDataFromServer = response?.data;
			if (productDataFromServer) {
				productName = productDataFromServer.title;
				productDescription = productDataFromServer.content;
				price = productDataFromServer.price;
				await initImagesFromServer(productDataFromServer); // ✅ 이미지 초기화
			}
		} catch (error: any) {
			console.error('❌ 상품 조회 실패:', error?.message);
			alert(`상품 정보를 불러오는 중 오류 발생! ${error?.message ?? ''}`);
		}
	}
	async function urlToFile(url: string, filename: string): Promise<File> {
		const response = await fetch(url);
		const blob = await response.blob();
		const ext = url.split('.').pop()?.split('?')[0] ?? 'jpg'; // 확장자 추정
		return new File([blob], filename, { type: blob.type });
	}
	async function initImagesFromServer(product: ProductDetail) {
		const urls = product.imgs.map((img) => img.img_url);

		// 이미지 미리보기는 URL 그대로 사용 가능
		imagePreviews = [...urls];

		// File[] 만들기
		images = await Promise.all(urls.map((url, i) => urlToFile(url, `image_${i}.jpg`)));
	}

	async function handleImageUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		if (!target.files) return;

		const newFiles = Array.from(target.files);

		for (const file of newFiles) {
			if (!file.type.startsWith('image/')) continue;

			// 중복 체크
			if (images.some((f) => f.name === file.name && f.lastModified === file.lastModified)) {
				continue;
			}

			const processedFile = await processImage(file);

			images = [...images, processedFile];

			const previewUrl = URL.createObjectURL(processedFile);
			imagePreviews = [...imagePreviews, previewUrl];
		}

		// 같은 파일 다시 선택 가능하도록 초기화
		target.value = '';
	}

	function removeImage(index: number) {
		images = images.filter((_, i) => i !== index);
		imagePreviews = imagePreviews.filter((_, i) => i !== index);
	}

	async function handleSubmit() {
		if (!productName || !productDescription || images.length === 0) {
			alert('모든 필드를 입력해주세요.');
			return;
		}
		const formData = new FormData();
		formData.append('name', productName);
		formData.append('description', productDescription);
		formData.append('price', price + '');
		formData.append('category_idp', category_idp + '');
		formData.append('product_idp', product_idp + '');
		images.forEach((img) => formData.append('images', img));

		try {
			let response: any = await axios.post(`${api}/api/product/product_upload`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${$user?.userToken ?? ''}`
				}
			});
			response = response?.data;
			if (!response?.success) {
				alert(`업로드 실패. ${response?.message ?? ''}`);
				return;
			}
			alert('업로드 성공!');
			productName = '';
			productDescription = '';
			images = [];
			imagePreviews = [];
			goto('/');
		} catch (error) {
			console.error(error);
			alert('서버 오류로 업로드 실패');
		}
	}

	async function processImage(file: File): Promise<File> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => {
				const img = new Image();
				img.onload = () => {
					const MAX_DIMENSION = 1080;
					let { width, height } = img;

					// 리사이즈 필요 여부 확인
					if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
						const ratio = width / height;
						if (ratio > 1) {
							width = MAX_DIMENSION;
							height = Math.round(MAX_DIMENSION / ratio);
						} else {
							height = MAX_DIMENSION;
							width = Math.round(MAX_DIMENSION * ratio);
						}
					}

					// canvas에 그리기
					const canvas = document.createElement('canvas');
					canvas.width = width;
					canvas.height = height;
					const ctx = canvas.getContext('2d')!;
					ctx.drawImage(img, 0, 0, width, height);

					// canvas를 webp Blob으로 변환
					canvas.toBlob(
						(blob) => {
							if (blob) {
								const newFile = new File([blob], file.name.replace(/\.\w+$/, '.webp'), {
									type: 'image/webp',
									lastModified: Date.now()
								});
								resolve(newFile);
							} else {
								reject(new Error('webp 변환 실패'));
							}
						},
						'image/webp',
						0.9 // 품질 (0~1)
					);
				};
				img.onerror = (e) => reject(e);
				img.src = reader.result as string;
			};
			reader.onerror = (e) => reject(e);
			reader.readAsDataURL(file);
		});
	}
</script>

<!-- ✅ 본문 -->
<div class="max-w-2xl mx-auto my-8 p-6 bg-white shadow-md rounded">
	<h1 class="text-2xl font-bold mb-6 flex items-center gap-2">🛍️ 상품 업로드</h1>

	<!-- 입력 폼 -->
	<div class="space-y-4">
		<div>
			<label class="block text-sm font-semibold mb-1">상품 이름</label>
			<input
				bind:value={productName}
				placeholder="상품 이름"
				class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>

		<div>
			<label class="block text-sm font-semibold mb-1">가격</label>
			<input
				bind:value={price}
				placeholder="가격"
				class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>

		<div>
			<label class="block text-sm font-semibold mb-1">상품 설명</label>
			<textarea
				bind:value={productDescription}
				placeholder="상품 설명"
				rows="3"
				class="w-full px-4 py-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
			></textarea>
		</div>

		<!-- 이미지 업로드 -->
		<div>
			<label class="block font-semibold mb-1">이미지 업로드</label>
			<input
				type="file"
				multiple
				accept="image/*"
				on:change={handleImageUpload}
				class="file:mr-4 file:px-4 file:py-2 file:rounded file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 text-sm text-gray-500 w-full"
			/>
		</div>
		{#if imagePreviews.length > 0}
			<div class="mt-6 flex flex-wrap gap-4">
				{#each imagePreviews as src, i}
					<div
						class="w-[224px] border rounded shadow bg-white overflow-hidden flex flex-col items-center"
					>
						<!-- 썸네일 -->
						<img {src} alt="업로드 이미지" class="w-full h-[224px] object-contain bg-gray-50" />

						<!-- ❌ 삭제 버튼: 아래쪽에 -->
						<button
							on:click={() => removeImage(i)}
							class="mt-2 mb-2 px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
						>
							삭제
						</button>
					</div>
				{/each}
			</div>
		{/if}

		<!-- 제출 버튼 -->

		<div class="pt-4">
			<button
				on:click={handleSubmit}
				class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
			>
				✅ 상품 등록
			</button>
		</div>
	</div>
</div>
