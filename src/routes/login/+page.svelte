<script lang="ts">
	import { auth, provider } from '$lib/firebase';
	import type { User } from 'firebase/auth';
	import { signInWithPopup } from 'firebase/auth';
	import { user } from '$lib/stores/userStore';
	import axios from 'axios';

	const api = import.meta.env.VITE_SERVER_API_URL;

	async function loginWithGoogle() {
		try {
			const result = await signInWithPopup(auth, provider);
			const firebaseUser = result.user;
			firebaseUser.getIdToken();
			console.log('✅ 로그인 성공:', firebaseUser);
			let response: any = await axios.post(
				`${api}/api/auth/login`, // ✅ 요청할 서버 주소
				{
					uid: firebaseUser.uid,
					email: firebaseUser.email,
					displayname: firebaseUser.displayName,
					photourl: firebaseUser.photoURL,
					providerid: firebaseUser.providerId,
					idtoken: firebaseUser?.getIdToken() ?? ''
				} // ✅ body에 들어갈 객체
			);
			response = response?.data;
			if (!response?.success) {
				console.error('❌ 로그인 실패:', response?.message);
				alert(`로그인 중 오류 발생!. ${response?.message}`);
			}
			console.log(`## response: `, response?.data);
			user.set(response?.data);
			alert(`환영합니다! ${firebaseUser?.displayName}`);
		} catch (error: any) {
			console.error('❌ 로그인 실패:', error?.message);
			alert('로그인 중 오류 발생!');
		}
	}

	async function logout() {
		try {
			user.set(null);
		} catch (error: any) {
			console.error('❌ 로그아웃 실패:', error?.message);
			alert('로그아웃 중 오류 발생!');
		}
	}
</script>

<div>
	{#if $user}
		<p>환영합니다, {$user?.userData.displayname}님!</p>
		<button on:click={logout}> logout </button>
	{:else}
		<p>로그인이 필요합니다.</p>
		<button on:click={loginWithGoogle}> Google로 로그인 </button>
	{/if}
</div>
