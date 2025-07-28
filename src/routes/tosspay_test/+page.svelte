<script lang="ts">
	import { onMount } from 'svelte';
	import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk';
	import { writable } from 'svelte/store';

	const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';

	export let data: {
		product_idp: number;
		user_idp: number;
		amount: number;
		title: string;
	};
	let { product_idp, user_idp, amount, title } = data;

	let customerKey = `${user_idp}__${product_idp}__${Date.now()}`;
	let orderId = `${user_idp}__${product_idp}__${Date.now()}`;
	let ready = false;

	let widgets: any = null;

	onMount(async () => {
		const tossPayments = await loadTossPayments(clientKey);
		widgets = tossPayments.widgets({ customerKey });

		await widgets.setAmount({ currency: 'KRW', value: amount });

		await Promise.all([
			widgets.renderPaymentMethods({
				selector: '#payment-method',
				variantKey: 'DEFAULT'
			}),
			widgets.renderAgreement({
				selector: '#agreement',
				variantKey: 'AGREEMENT'
			})
		]);

		ready = true;
	});

	function toggleCoupon(event: Event) {
		const checked = (event.target as HTMLInputElement).checked;
		const newValue = checked ? 450 : 500;
		amount = newValue;
		widgets?.setAmount({ currency: 'KRW', value: newValue });
	}

	async function requestPayment() {
		if (!widgets) return;
		try {
			await widgets.requestPayment({
				orderId: 'order123456',
				orderName: '토스 티셔츠 외 2건',
				successUrl: window.location.origin + '/tosspay_success',
				failUrl: window.location.origin + '/tosspay_fail',
				customerEmail: 'customer123@gmail.com',
				customerName: '김토스',
				customerMobilePhone: '01012341234'
			});
		} catch (error) {
			console.error(error);
		}
	}
</script>

<div class="wrapper">
	<div class="box_section">
		<!-- 결제 UI -->
		<div id="payment-method" />
		<!-- 이용약관 UI -->
		<div id="agreement" />

		<!-- 쿠폰 체크박스 -->
		<label for="coupon-box">
			<input id="coupon-box" type="checkbox" on:change={toggleCoupon} />
			<span>5,000원 쿠폰 적용</span>
		</label>

		<!-- 결제 버튼 -->
		<button on:click={requestPayment} disabled={ready === false}> 결제하기 </button>
	</div>
</div>
