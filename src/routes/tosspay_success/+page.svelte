<!-- src/routes/payment/fail/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { user } from '$lib/stores/userStore';
	import { goto } from '$app/navigation';
	const api = import.meta.env.VITE_SERVER_API_URL;

	export let data: {
		paymentType: string;
		orderId: string;
		paymentKey: string;
		amount: number;
	};
	let { paymentType, orderId, paymentKey, amount } = data;

	onMount(async () => {
		try {
			const response = await axios.post(
				`${api}/api/tosspay/confirm`,
				{
					// 요청 본문 (JSON 형식)
					paymentKey: paymentKey,
					orderId: orderId,
					amount: amount,
					paymentType: paymentType
				},
				{
					// 옵션 (헤더 등)
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${$user?.userToken ?? ''}`
					}
				}
			);

			console.log('응답 데이터:', response.data);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error('에러 응답:', error.response?.data);
			} else {
				console.error('예상치 못한 에러:', error);
			}
		}
	});
</script>

<h1>결제 성공</h1>
<p>paymentType: {paymentType}</p>
<p>결제 키: {paymentKey}</p>
<p>주문 ID: {orderId}</p>
<p>결제 금액: {amount}</p>
