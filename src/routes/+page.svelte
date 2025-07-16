<script lang="ts">
	import Banner from '$lib/components/Banner.svelte';
	import ProductList from '$lib/components/ProductList.svelte';

	const products = [
		{
			title: '방탄 2016여름 패키지 화보',
			price: '20,000원',
			time: '4일 전',
			img: 'https://via.placeholder.com/150'
		},
		{
			title: '소니 50.4GM 오사카 팝니다',
			price: '1,450,000원',
			time: '15시간 전',
			img: 'https://via.placeholder.com/150'
		},
		{
			title: '디스커버리 여성 바람막이',
			price: '109,000원',
			time: '7일 전',
			img: 'https://via.placeholder.com/150'
		},
		{
			title: 'ETRO 니트 스커트',
			price: '98,000원',
			time: '1일 전',
			img: 'https://via.placeholder.com/150'
		},
		{
			title: '보더도 웨이브 잡지',
			price: '17,000원',
			time: '1일 전',
			img: 'https://via.placeholder.com/150'
		},
		{
			title: '아크테릭스 후디 자켓',
			price: '598,000원',
			time: '14시간 전',
			img: 'https://via.placeholder.com/150'
		},
		{
			title: '더블알엘 커뮤터 자켓',
			price: '1,290,000원',
			time: '11일 전',
			img: 'https://via.placeholder.com/150'
		},
		{
			title: '오클리 백팩 새상품',
			price: '130,000원',
			time: '11일 전',
			img: 'https://via.placeholder.com/150'
		},
		{
			title: '나이키 윈드브레이커',
			price: '100,000원',
			time: '3일 전',
			img: 'https://via.placeholder.com/150'
		},
		{
			title: '프라이탁 카드지갑',
			price: '160,000원',
			time: '13시간 전',
			img: 'https://via.placeholder.com/150'
		}
	];
</script>

<Banner />

<ProductList {products} />
