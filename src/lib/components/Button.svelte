<script lang="ts">
	export let label: string;
	export let textColor: string = '#ffffff';
	export let bgColor: string = '#000000';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let align: 'left' | 'right' | 'center' = 'left';
	export let onClick: () => void;
</script>

<button
	class="button"
	on:click={onClick}
	style="
    background-color: {bgColor};
    color: {textColor};
    font-size: {size === 'lg' ? '1.2rem' : size === 'sm' ? '0.8rem' : '1rem'};
    margin-left: {align === 'right' ? 'auto' : '0'};
    margin-right: {align === 'left' ? 'auto' : '0'};
  "
>
	{label}
</button>

<style>
	.button {
		border: none;
		border-radius: 5px;
		cursor: pointer;
		padding: 10px 20px;
		font-weight: bold;
	}
</style>
