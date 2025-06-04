<script lang="ts">
	import '../app.css';
	import Header from '../lib/components/Header.svelte';

	let { children } = $props();
</script>

<Header />
<div class="pt-12">{@render children()}</div>
