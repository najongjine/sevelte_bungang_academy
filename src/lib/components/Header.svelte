<!-- src/lib/components/Header.svelte -->
<script lang="ts">
</script>

<header style="background: #eee; padding: 1rem;">
	<!-- 헤더 -->
	<div class="w-full border-b px-4 py-3 flex items-center gap-4">
		<h1 class="text-xl font-bold text-black">나의장터</h1>
		<input
			class="flex-1 border px-4 py-2 rounded text-sm"
			placeholder="상품명, 지역명, @상점명 입력"
		/>
		<button class="border px-4 py-2 text-sm">로그인</button>
	</div>
</header>
