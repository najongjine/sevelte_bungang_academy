<script lang="ts">
  import { auth, provider } from '$lib/firebase';
  import { signInWithPopup } from 'firebase/auth';

  async function loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('✅ 로그인 성공:', user);
      alert(`환영합니다! ${user.displayName}`);
    } catch (error:any) {
      console.error('❌ 로그인 실패:', error?.message);
      alert('로그인 중 오류 발생!');
    }
  }
</script>

<button on:click={loginWithGoogle}>
  Google로 로그인
</button>
