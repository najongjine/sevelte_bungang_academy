<!-- src/routes/payment/fail/+page.svelte -->
<script lang="ts">
	export let data: {
		paymentType: string;
		orderId: string;
		paymentKey: string;
		amount: number;
	};
	let { paymentType, orderId, paymentKey, amount } = data;
</script>

<h1>결제 성공</h1>
<p>paymentType: {paymentType}</p>
<p>결제 키: {paymentKey}</p>
<p>주문 ID: {orderId}</p>
<p>결제 금액: {amount}</p>
