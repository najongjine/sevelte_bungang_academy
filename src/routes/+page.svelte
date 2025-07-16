<script lang="ts">
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

<!-- 배너 -->
<div class="bg-blue-500 text-white text-center py-6 px-4">
	<h2 class="text-lg font-semibold">📦 첫 구매 할인</h2>
	<p class="mt-1">메루카리 최대 1만 원 쿠폰 받아 가세요</p>
	<div class="flex justify-center gap-6 mt-4">
		<div class="bg-white text-black px-6 py-3 rounded shadow text-sm">
			5만 원 이상 구매 시 <span class="font-bold text-lg">5,000</span>
		</div>
		<div class="bg-black text-white px-6 py-3 rounded shadow text-sm">
			10만 원 이상 구매 시 <span class="font-bold text-lg">10,000</span>
		</div>
	</div>
</div>

<!-- 상품 목록 -->
<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
	{#each products as p}
		<div class="border rounded shadow-sm hover:shadow-md transition">
			<img src={p.img} alt={p.title} class="w-full h-auto" />
			<div class="p-2">
				<h3 class="text-sm font-medium truncate">{p.title}</h3>
				<p class="text-red-500 font-bold mt-1">{p.price}</p>
				<p class="text-gray-500 text-xs mt-1">{p.time}</p>
			</div>
		</div>
	{/each}
</div>
