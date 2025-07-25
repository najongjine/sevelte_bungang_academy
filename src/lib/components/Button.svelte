<script lang="ts">
	export let label: string = '버튼';
	export let textColor: string = '#ffffff';
	export let bgColor: string = '#007bff';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let align: 'left' | 'center' | 'right' = 'center';
	export let onClick: () => void = () => {};

	const sizeMap = {
		sm: '8px 12px',
		md: '10px 16px',
		lg: '14px 24px'
	};

	const fontSizeMap = {
		sm: '12px',
		md: '14px',
		lg: '16px'
	};

	const alignMap = {
		left: 'flex-start',
		center: 'center',
		right: 'flex-end'
	};
</script>

<div class="wrapper" style="justify-content: {alignMap[align]}">
	<button
		class="btn"
		on:click={onClick}
		style="
      background-color: {bgColor};
      color: {textColor};
      padding: {sizeMap[size]};
      font-size: {fontSizeMap[size]};
    "
	>
		{label}
	</button>
</div>

<style>
	.wrapper {
		display: flex;
		margin: 8px 0;
	}

	.btn {
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: opacity 0.2s;
	}

	.btn:hover {
		opacity: 0.85;
	}
</style>
