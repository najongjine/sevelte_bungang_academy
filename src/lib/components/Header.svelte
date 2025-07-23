<!-- src/lib/components/Header.svelte -->
<script lang="ts">
</script>

<header>
	<!-- 헤더 (로고 + 검색창 + 로그인) -->
	<div class="w-full px-4 py-3 flex items-center gap-4">
		<h1 class="text-xl font-bold text-purple-700">
			<a href="/">나의장터</a>
		</h1>
		<input
			class="flex-1 border px-4 py-2 rounded text-sm"
			placeholder="상품명, 지역명, @상점명 입력"
		/>
		<button class="border px-4 py-2 text-sm">로그인</button>
	</div>

	<!-- 상품 올리기: 왼쪽으로 넓게 들여쓰기 -->
	<div class="w-full pt-4 text-sm">
		<a href="/product_upload"
			><button class="text-black hover:underline" style="margin-left: 7rem;">
				상품 올리기
			</button></a
		>
		<br /><br />
	</div>

	<!-- 구분선 -->
	<hr class="border-t-2 border-gray-400" />
</header>
