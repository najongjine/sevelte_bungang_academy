<script lang="ts">
	import { auth, provider } from '$lib/firebase';
	import type { User } from 'firebase/auth';
	import { signInWithPopup } from 'firebase/auth';
	import { user } from '$lib/stores/userStore';

	async function loginWithGoogle() {
		try {
			const result = await signInWithPopup(auth, provider);
			const firebaseUser = result.user;
			console.log('✅ 로그인 성공:', user);
			user.set(firebaseUser);
			alert(`환영합니다! ${firebaseUser?.displayName}`);
		} catch (error: any) {
			console.error('❌ 로그인 실패:', error?.message);
			alert('로그인 중 오류 발생!');
		}
	}
</script>

<div>
	{#if $user}
		<p>환영합니다, {$user.displayName}님!</p>
	{:else}
		<p>로그인이 필요합니다.</p>
		<button on:click={loginWithGoogle}> Google로 로그인 </button>
	{/if}
</div>
