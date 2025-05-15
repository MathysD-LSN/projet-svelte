<script lang="ts">
	import type { Movie } from '../../utils/moviesUtils';
	import type { Genre } from '../../utils/moviesUtils';
	export let data: { movies: Movie[], genres: Genre[] };
	
	const genres = data.genres;
	const movies = data.movies;

	const itemsPerPage = 20;
	let currentPage = 1;

	let selectedGenre: string = '';
	let minRating: number = 0;

	
	$: if (selectedGenre || minRating) {
		currentPage = 1;
	}

	$: filteredMovies = movies.filter((movie) => {
		const selectedGenreId = selectedGenre ? parseInt(selectedGenre) : null;
		const genreMatch = selectedGenreId === null || movie.genre_ids?.includes(selectedGenreId);
		const rating = movie.vote_average ?? 0;
		const ratingMatch = rating >= minRating
		return genreMatch && ratingMatch;
	});


	$: totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
	$: paginated = filteredMovies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	$: pagesToShow = (() => {
		const delta = 2;
		let rangeStart = Math.max(1, currentPage - delta);
		let rangeEnd = Math.min(totalPages, currentPage + delta);
		const pages: (number | '...')[] = [];
		if (rangeStart > 1) {
			pages.push(1);
			if (rangeStart > 2) pages.push('...');
		}
		for (let p = rangeStart; p <= rangeEnd; p++) pages.push(p);
		if (rangeEnd < totalPages) {
			if (rangeEnd < totalPages - 1) pages.push('...');
			pages.push(totalPages);
		}
		return pages;
	})();

	let showFilters = false;
	const toggleFilters = () => (showFilters = !showFilters);
</script>

<div class="mx-auto mt-12 w-full px-4 text-center sm:max-w-lg md:max-w-4xl lg:max-w-[90%]">
	<!-- Bouton filtres (mobile) -->
	<button
		class="sticky top-10 z-30 mb-4 flex w-full items-center justify-between rounded-lg bg-white p-4 shadow-sm md:hidden"
		on:click={toggleFilters}
	>
		<span class="text-lg font-semibold text-gray-900">Filtres</span>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="h-6 w-6 text-gray-600"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
		</svg>
	</button>

	<div class="flex flex-col md:flex-row">
		<!-- Panneau de filtres -->
		<aside class="sticky top-30 z-20 w-full md:top-12 md:w-1/4 md:self-start md:pr-4">
			{#if showFilters}
				<div class="mb-6 rounded-lg bg-white p-4 shadow-lg md:hidden">
					<h2 class="mb-2 font-semibold text-gray-900">Filtres</h2>
					<div class="space-y-4 text-left text-sm text-gray-700">
						<!-- Genre -->
						<label class="block">
							<span class="mb-1 block font-medium">Genre</span>
							<select bind:value={selectedGenre} class="w-full rounded border-gray-300 p-2">
								<option value="">Tous</option>
								{#each genres as genre}
									<option value={genre.id}>{genre.name}</option>
								{/each}
							</select>

						</label>

						<label class="block">
							<span class="mb-1 block font-medium">Note minimale</span>
							<input
								type="range"
								min="0"
								max="10"
								step="1"
								bind:value={minRating}
								list="rating-ticks"
								class="w-full"
							/>
							<datalist id="rating-ticks">
								{#each Array(11)
									.fill(0)
									.map((_, i) => i) as i}
									<option value={i}></option>
								{/each}
							</datalist>
							<div class="mt-1 flex justify-between text-xs text-gray-500">
								<span>0</span>
								<span>5</span>
								<span>10</span>
							</div>
						</label>
					</div>
				</div>
			{/if}

			<div class="mb-6 hidden rounded-lg bg-white p-4 shadow-lg md:block">
				<h2 class="mb-4 text-left font-semibold text-gray-900 md:text-xl lg:text-3xl">Filtres</h2>
				<div class="space-y-4 text-left text-sm text-gray-700 lg:text-lg">
					<label class="block">
						<span class="mb-1 block font-medium">Genre</span>
						<select bind:value={selectedGenre} class="w-full rounded border-gray-300 p-2">
								<option value="">Tous</option>
								{#each genres as genre}
									<option value={genre.id}>{genre.name}</option>
								{/each}
							</select>
					</label>

					<label class="block">
						<span class="mb-1 block font-medium">Note minimale</span>
						<input
							type="range"
							min="0"
							max="10"
							step="1"
							bind:value={minRating}
							list="rating-ticks"
							class="w-full"
						/>
						<datalist id="rating-ticks">
							{#each Array(11)
								.fill(0)
								.map((_, i) => i) as i}
								<option value={i}></option>
							{/each}
						</datalist>
						<div class="mt-1 flex justify-between text-xs text-gray-500">
							<span>0</span>
							<span>5</span>
							<span>10</span>
						</div>
					</label>
				</div>
			</div>
		</aside>

		<!-- Liste de films paginée -->
		<section class="w-full md:w-3/4">
			{#if movies.length === 0}
	<p class="py-4">Chargement des films…</p>
{:else if filteredMovies.length === 0}
	<p class="py-4">Aucun film ne correspond à vos filtres.</p>
{:else}
				<ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{#each paginated as movie}
						<li class="mx-auto w-full overflow-hidden rounded-2xl bg-white shadow-lg">
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
								<h3 class="mb-2 text-left text-lg font-semibold text-gray-900">{movie.title}</h3>
								<p class="mb-6 line-clamp-3 flex-grow text-left text-sm text-gray-600">
									{movie.overview || 'Pas de description disponible.'}
								</p>
								<a
									href={`/films/${movie.id}`}
									class="flex items-center gap-1 self-start rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="h-5 w-5"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M12 4.5v15m7.5-7.5h-15"
										/>
									</svg>
									Détails
								</a>
							</div>
						</li>
					{/each}
				</ul>

				<!-- Pagination -->
				<nav class="my-12 flex items-center justify-center space-x-2">
					<button
						class="rounded border px-3 py-1 duration-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white disabled:opacity-50"
						on:click={() => (currentPage = currentPage - 1)}
						disabled={currentPage === 1}
					>
						Précédent
					</button>

					{#each pagesToShow as p}
						{#if p === '...'}
							<span class="px-3 py-1 text-gray-500 select-none">…</span>
						{:else}
							<button
								class="rounded border px-3 py-1 transition duration-300 hover:bg-blue-300
									{currentPage === p ? 'border-blue-500 bg-blue-500 text-white' : 'bg-white text-gray-700'}"
								on:click={() => (currentPage = p)}
							>
								{p}
							</button>
						{/if}
					{/each}

					<button
						class="rounded border px-3 py-1 duration-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white disabled:opacity-50"
						on:click={() => (currentPage = currentPage + 1)}
						disabled={currentPage === totalPages}
					>
						Suivant
					</button>
				</nav>
			{/if}
		</section>
	</div>
</div>
