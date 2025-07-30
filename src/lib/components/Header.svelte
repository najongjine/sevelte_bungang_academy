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
	<div class="left-box" style="display: flex; align-items: center;">
		<div class="logo">나의장터</div>
		<div class="search-box">
			<input type="text" placeholder="상품명, 지역명, @상점명 입력" />
		</div>
	</div>
	<div class="right-box">
		{#if currentUser?.userData?.idp}
			<div>환영합니다. {currentUser?.userData?.displayname ?? ''}</div>
			<button on:click={logout}> logout </button>
		{:else}
			<a href="/login"><button class="border px-4 py-2 text-sm">로그인</button></a>
		{/if}
	</div>
</header>

<style>
	header {
		background-color: #f8f8f8;
		border-bottom: 2px solid #ddd;
		padding: 12px 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-family: 'Segoe UI', sans-serif;
	}

	.logo {
		font-size: 24px;
		font-weight: bold;
		color: #5e2ca5; /* 퍼플 계열 포인트 */
		margin-right: 30px;
		white-space: nowrap;
	}

	.search-box input {
		width: 320px;
		padding: 8px 12px;
		font-size: 14px;
		border: 1px solid #aaa;
		border-radius: 4px;
	}

	.right-box {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 14px;
	}

	button.logout {
		background-color: #5e2ca5;
		color: white;
		border: none;
		padding: 6px 12px;
		border-radius: 4px;
		cursor: pointer;
		font-weight: bold;
		font-size: 13px;
	}

	button.logout:hover {
		background-color: #4a218b;
	}
</style>
