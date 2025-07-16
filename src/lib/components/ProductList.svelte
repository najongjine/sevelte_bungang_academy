<script lang="ts">
	/**
	 * This prop is required.
	 */
	export let products = [] as any[];
</script>

<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
	{#each products as p}
		<div class="border rounded shadow-sm hover:shadow-md transition">
			<img src={p?.img} alt={p?.title} class="w-full h-auto" />
			<div class="p-2">
				<h3 class="text-sm font-medium truncate">{p?.title}</h3>
				<p class="text-red-500 font-bold mt-1">{p?.price}</p>
				<p class="text-gray-500 text-xs mt-1">{p?.time}</p>
			</div>
		</div>
	{/each}
</div>
