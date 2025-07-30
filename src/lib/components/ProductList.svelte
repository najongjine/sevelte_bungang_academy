<script lang="ts">
	import type { ProductDetail } from '$lib/types/product_type';

	/**
	 * This prop is required.
	 */
	export let products: ProductDetail[]; // 기본값 생략 (선언만)
</script>

<div class="grid-container">
	{#each products as p}
		<div class="card">
			<a href={`/product_detail?product_idp=${p?.idp}`}>
				<img src={p?.imgs[0]?.img_url ?? '/default.png'} alt={p?.title ?? ''} />
				<div class="card-content">
					<div class="card-title">{p?.title}</div>
					<div class="card-price">{p?.price} 원</div>
					<div class="card-date">{p?.created_dt}</div>
				</div>
			</a>
		</div>
	{/each}
</div>

<style>
	.grid-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 20px;
		padding: 20px;
	}

	.card {
		border: 1px solid #ddd;
		border-radius: 10px;
		overflow: hidden;
		background-color: white;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
		transition: transform 0.2s;
	}

	.card:hover {
		transform: translateY(-5px);
	}

	.card img {
		width: 100%;
		height: 200px;
		object-fit: cover;
		display: block;
	}

	.card-content {
		padding: 12px 16px;
	}

	.card-title {
		font-size: 16px;
		font-weight: bold;
		color: #5e2ca5;
		margin-bottom: 6px;
	}

	.card-price {
		font-size: 14px;
		color: #222;
		margin-bottom: 4px;
	}

	.card-date {
		font-size: 12px;
		color: #888;
	}
</style>
