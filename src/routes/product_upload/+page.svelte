<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/userStore';
	import axios from 'axios';

	const api = import.meta.env.VITE_SERVER_API_URL;

	let productName: string = '';
	let productDescription: string = '';
	let images: File[] = [];
	let imagePreviews: string[] = [];

	function handleImageUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files) {
			images = Array.from(target.files);

			// 이미지 미리보기 생성
			imagePreviews = images.map((file) => URL.createObjectURL(file));
		}
	}

	function handleSubmit() {
		if (!productName || !productDescription || images.length === 0) {
			alert('모든 필드를 입력해주세요.');
			return;
		}

		const formData = new FormData();
		formData.append('name', productName);
		formData.append('description', productDescription);
		images.forEach((img) => formData.append('images', img));

		// 예시: 서버에 POST 요청 (엔드포인트는 실제로 구성해야 함)
		fetch('/api/products', {
			method: 'POST',
			body: formData
		}).then((res) => {
			if (res.ok) {
				alert('업로드 성공!');
				productName = '';
				productDescription = '';
				images = [];
				imagePreviews = [];
			} else {
				alert('업로드 실패');
			}
		});
	}
</script>

<h1>상품 업로드</h1>

<div>
	<label>상품 이름</label>
	<input bind:value={productName} placeholder="상품 이름" />

	<label>상품 설명</label>
	<textarea bind:value={productDescription} placeholder="상품 설명"></textarea>

	<label>이미지 업로드</label>
	<input type="file" multiple accept="image/*" on:change={handleImageUpload} />

	{#if imagePreviews.length > 0}
		<div class="preview">
			{#each imagePreviews as src}
				<img {src} alt="미리보기 이미지" />
			{/each}
		</div>
	{/if}

	<button on:click={handleSubmit}>업로드</button>
</div>

<style>
	.preview {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 1rem;
	}
	.preview img {
		width: 150px;
		height: 150px;
		object-fit: cover;
		border: 1px solid #ccc;
	}
</style>
