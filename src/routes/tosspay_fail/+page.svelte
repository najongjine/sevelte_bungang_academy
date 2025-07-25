<!-- src/routes/payment/success/+page.svelte -->
<script lang="ts">
	export let data: {
		code: string;
		message: string;
	};
</script>

<h1>결제 실패</h1>
<p>코드: {data?.code}</p>
<p>메시지: {data?.message}</p>
