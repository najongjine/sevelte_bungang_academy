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
	let guideMessage = '결제 확인중...';

	onMount(async () => {
		try {
			let response: any = await axios.post(
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
			response = response?.data;
			if (!response?.success) {
				console.error('❌ 결제 검증 실패:', response?.message);
				alert(`결제 검증 오류: ${response?.message}`);
				guideMessage = `결제 검증 오류. <br/> ${response?.message ?? ''}`;
				return;
			}
			response = response?.data;
			guideMessage = `결제 성공!`;
		} catch (error: any) {
			console.error('❌ 서버 에러:', error?.message ?? '');
			guideMessage = `서버 에러! <br/> ${error?.message ?? ''}`;
			alert(`서버 에러! ${error?.message ?? ''}`);
		}
	});
</script>

<h1>${guideMessage}</h1>
<p>paymentType: {paymentType}</p>
<p>결제 키: {paymentKey}</p>
<p>주문 ID: {orderId}</p>
<p>결제 금액: {amount}</p>
