<script lang="ts">
  import { counter } from '$lib/stores/counter';
</script>

<h1>🧮 Persisted Counter</h1>

<p>현재 값: {$counter}</p>

<button on:click={() => $counter++}>+1</button>
<button on:click={() => $counter--}>-1</button>
<button on:click={() => $counter = 0}>Reset</button>
