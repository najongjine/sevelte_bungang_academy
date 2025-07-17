<script lang="ts">
	let productName = '';
	let productDescription = '';
	let images: File[] = [];
	let imagePreviews: string[] = [];

	function handleImageUpload(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files) {
			const newFiles = Array.from(target.files);
			// 이미지 누적 저장 및 미리보기 생성
			for (const file of newFiles) {
				if (!images.some((f) => f.name === file.name && f.lastModified === file.lastModified)) {
					images = [...images, file]; // ← reactivity 보장
					imagePreviews = [...imagePreviews, URL.createObjectURL(file)];
				}
			}
			// ✅ 같은 파일 다시 선택할 수 있도록 초기화
			target.value = '';
		}
	}

	function removeImage(index: number) {
		images = images.filter((_, i) => i !== index);
		imagePreviews = imagePreviews.filter((_, i) => i !== index);
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
