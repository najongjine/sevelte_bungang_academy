<!-- src/routes/payment/success/+page.svelte -->
<script lang="ts">
	export let data: {
		paymentKey: string;
		orderId: string;
		amount: string;
	};
</script>

<h1>결제 성공</h1>
<p>결제 키: {data.paymentKey}</p>
<p>주문 ID: {data.orderId}</p>
<p>결제 금액: {data.amount}</p>
