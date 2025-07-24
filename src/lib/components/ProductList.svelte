<script lang="ts">
	import type { ProductDetail } from '$lib/types/product_type';

	/**
	 * This prop is required.
	 */
	export let products: ProductDetail[]; // 기본값 생략 (선언만)
</script>

<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
	{#each products as p}
		<div class="border rounded shadow-sm hover:shadow-md transition bg-white">
			<a href={`/product_detail?product_idp=${p?.idp}`}>
				<div class="w-full aspect-square overflow-hidden">
					<img
						src={p?.imgs[0]?.img_url ?? '/default.png'}
						alt={p?.title}
						class="w-full h-full object-cover"
					/>
				</div>
				<div class="p-2">
					<h3 class="text-sm font-medium truncate">{p?.title}</h3>
					<p class="text-red-500 font-bold mt-1">{p?.price}</p>
					<p class="text-gray-500 text-xs mt-1">{p?.created_dt}</p>
				</div>
			</a>
		</div>
	{/each}
</div>
