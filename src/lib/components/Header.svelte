<!-- src/lib/components/Header.svelte -->
<script lang="ts">
	import { get } from 'svelte/store';
	import { user } from '$lib/stores/userStore';

	const currentUser = get(user);

	async function logout() {
		try {
			user.set(null);
		} catch (error: any) {
			console.error('❌ 로그아웃 실패:', error?.message);
			alert('로그아웃 중 오류 발생!');
		}
	}
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
		{#if currentUser?.userData?.idp}
			<div>환영합니다. {currentUser?.userData?.displayname ?? ''}</div>
			<button on:click={logout}> logout </button>
		{:else}
			<a href="/login"><button class="border px-4 py-2 text-sm">로그인</button></a>
		{/if}
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
