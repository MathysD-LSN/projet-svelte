<script lang="ts">
	import { onMount } from 'svelte';
	import Hero from '../lib/components/Hero.svelte';
	import { getMovies } from '../utils/getMovies';

	let movies: any[] = [];
	let isLoadingMovies = false;

	async function fetchMovies() {
		isLoadingMovies = true;
		try {
			movies = (await getMovies(1)) || [];
		} catch (e) {
			console.error(e);
			movies = [];
		} finally {
			isLoadingMovies = false;
		}
	}

	onMount(fetchMovies);
</script>

<Hero onSearch={() => {}} />

<div class="mx-auto mt-12 w-full px-4 text-center sm:max-w-lg md:max-w-2xl lg:max-w-6xl">
	{#if isLoadingMovies}
		<p class="py-4">Chargement des dernières sorties…</p>
	{:else}
		<h2 class="mb-4 text-3xl font-semibold">Dernières sorties</h2>
		<ul class="grid grid-cols-1 gap-6 py-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each movies as movie}
				<li class="mx-auto max-w-xs overflow-hidden rounded-2xl bg-white shadow-lg">
					<div class="flex h-full flex-col p-4">
						<div class="mb-4 h-32 overflow-hidden rounded-lg">
							{#if movie.poster_path}
								<img
									src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
									alt={movie.title}
									class="h-full w-full object-cover"
								/>
							{:else}
								<div class="h-full w-full bg-gray-200"></div>
							{/if}
						</div>
						<h3 class="mb-2 text-left text-lg font-semibold text-gray-900">
							{movie.title}
						</h3>
						<p class="mb-6 line-clamp-3 flex-grow text-left text-sm text-gray-600">
							{movie.overview || 'Pas de description disponible.'}
						</p>
						<a
							href={'/films/' + movie.id}
							class="self-start rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
						>
							Plus d'infos
						</a>
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</div>
