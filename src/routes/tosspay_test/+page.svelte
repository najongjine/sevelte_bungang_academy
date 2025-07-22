<!-- src/lib/components/TossPaymentButton.svelte -->
<script lang="ts">
	let clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm'; // 테스트용 클라이언트 키
	let orderId = `order-${Date.now()}`;
	let orderName = '테스트 상품';
	let customerName = '홍길동';
	let amount = 1000;

	function requestPayment() {
		const tossPayments = (window as any).TossPayments(clientKey);

		tossPayments.requestPayment('카드', {
			amount,
			orderId,
			orderName,
			customerName,
			successUrl: window.location.origin + '/payment/success',
			failUrl: window.location.origin + '/payment/fail'
		});
	}
</script>

<button on:click={requestPayment}> 결제하기 </button>
