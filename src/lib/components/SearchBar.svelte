<script lang="ts">
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { searchMovies } from '../../utils/searchMovies';

	const dispatch = createEventDispatcher();
	let query = '';
	let results: any[] = [];
	let isLoading = false;
	let showDropdown = false;
	let lastFetchTimestamp: number | null = null;
	let container: HTMLDivElement;

	async function fetchResults(q: string) {
		if (!q) {
			results = [];
			showDropdown = false;
			return;
		}
		const now = Date.now();
		if (lastFetchTimestamp && now - lastFetchTimestamp < 300) return;
		lastFetchTimestamp = now;
		isLoading = true;
		try {
			const res = await searchMovies(q);
			results = res || [];
			showDropdown = true;
		} catch (e) {
			console.error(e);
			results = [];
		} finally {
			isLoading = false;
		}
	}

	function handleInput() {
		fetchResults(query);
		dispatch('search', query);
	}

	function handleClick() {
		fetchResults(query);
		dispatch('search', query);
	}

	function handleResultClick(movie: any) {
		showDropdown = false;
		dispatch('search', movie.title);
		// navigation sans window
		if (browser) {
			goto(`/films/${movie.id}`);
		}
	}

	function handleOutside(event: MouseEvent) {
		if (container && !container.contains(event.target as Node)) {
			showDropdown = false;
		}
	}

	onMount(() => {
		if (browser) {
			document.addEventListener('click', handleOutside);
		}
	});

	onDestroy(() => {
		if (browser) {
			document.removeEventListener('click', handleOutside);
		}
	});
</script>

<div class="relative w-full" bind:this={container}>
	<div class="flex w-full">
		<input
			type="text"
			bind:value={query}
			placeholder="Rechercher un film..."
			on:input={handleInput}
			class="flex-1 rounded-l-md border border-blue-500 p-3 text-black placeholder-gray-500 focus:border-blue-600 focus:shadow-inner focus:outline-none"
			on:keydown={(e) => e.stopPropagation()}
		/>
		<button
			type="button"
			on:click={handleClick}
			class="w-32 rounded-r-md border border-l-0 border-blue-500 bg-blue-500 p-3 text-white transition duration-300 hover:bg-blue-600 focus:border-blue-600 focus:shadow-inner focus:outline-none"
		>
			Chercher
		</button>
	</div>

	{#if showDropdown}
		<div
			class="dropdown absolute right-0 left-0 z-10 mt-1 max-h-64 overflow-y-auto rounded-lg bg-white shadow"
			role="listbox"
		>
			{#if isLoading}
				<p class="p-4 text-center text-gray-600">Chargement...</p>
			{:else if results.length > 0}
				<ul class="divide-y" role="presentation">
					{#each results as movie, index}
						<li
							role="option"
							aria-selected={false}
							tabindex="0"
							class="flex cursor-pointer items-center p-3 hover:bg-gray-100"
							on:click={() => handleResultClick(movie)}
							on:keydown={(e) => e.key === 'Enter' && handleResultClick(movie)}
						>
							{#if movie.poster_path}
								<img
									src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
									alt={movie.title}
									class="mr-4 h-16 w-auto rounded"
								/>
							{:else}
								<div class="mr-4 h-16 w-12 rounded bg-gray-200"></div>
							{/if}
							<div>
								<h3 class="text-sm font-semibold text-gray-900">{movie.title}</h3>
								<p class="line-clamp-2 text-xs text-gray-600">
									{movie.overview || 'Pas de description.'}
								</p>
							</div>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="p-4 text-center text-gray-500">Aucun film trouvé.</p>
			{/if}
		</div>
	{/if}
</div>

<style>
	/* Custom scrollbar for dropdown */
	.dropdown::-webkit-scrollbar {
		width: 4px;
	}
	.dropdown::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 2px;
	}
</style>
