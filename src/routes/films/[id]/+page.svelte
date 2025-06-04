<script lang="ts">
	export let data;
	const { movieData, alternativeMovies, credits } = data;
	const casts = credits.cast.slice(0, 10);
	const trailer = movieData?.videos?.results?.find((v: { type: string }) => v.type === 'Trailer');

	import { onMount } from 'svelte';

	let carousel: HTMLUListElement;
	let showLeft = false;
	let showRight = false;

	function updateButtons() {
		if (!carousel) return;
		showLeft = carousel.scrollLeft > 0;
		showRight = carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth;
	}

	function scrollByAmount(amount: number) {
		carousel.scrollBy({ left: amount, behavior: 'smooth' });
	}

	onMount(() => {
		updateButtons();
		carousel.addEventListener('scroll', updateButtons);
		window.addEventListener('resize', updateButtons);
		return () => {
			carousel.removeEventListener('scroll', updateButtons);
			window.removeEventListener('resize', updateButtons);
		};
	});

	// --- Nouveau formatage ---

	// Formatage de la date de sortie en français (JJ/MM/AAAA)
	$: formattedReleaseDate = movieData.release_date
		? new Date(movieData.release_date).toLocaleDateString('fr-FR')
		: '';

	// Conversion de la durée en "XhYY"
	$: formattedRuntime = movieData.runtime
		? `${Math.floor(movieData.runtime / 60)}h${String(movieData.runtime % 60).padStart(2, '0')}`
		: '';

	// Formatage du budget
	$: formattedBudget = (() => {
		const b = movieData.budget || 0;
		if (b >= 1_000_000) {
			return `${Math.round(b / 1_000_000)}M`;
		} else if (b >= 1_000) {
			return `${Math.round(b / 1_000)}k`;
		} else {
			return b.toString();
		}
	})();

	// Arrondir la note à 1 décimale
	$: formattedVoteAvg = movieData.vote_average != null ? movieData.vote_average.toFixed(1) : '';
</script>

<svelte:head>
	<title>CineFilm – {movieData.title}</title>
</svelte:head>

<!-- Banner with background image and overlay -->
<section
	class="relative flex h-80 w-full items-center justify-center bg-cover bg-center sm:h-100 md:h-140"
	style={`background-image: url('https://image.tmdb.org/t/p/original${movieData.backdrop_path}')`}
>
	<!-- Overlay sombre -->
	<div class="absolute inset-0 bg-black/70"></div>

	<!-- Contenu centré -->
	<div class="relative z-10 mx-auto max-w-3xl px-6 text-center text-white">
		<h1 class="mb-4 text-3xl font-bold drop-shadow-lg sm:text-5xl md:text-6xl">
			{movieData.title}
		</h1>
		{#if movieData.tagline}
			<p class="mb-6 text-gray-200 italic sm:text-lg md:text-xl">
				“{movieData.tagline}”
			</p>
		{/if}
		<div
			class="mx-auto flex flex-wrap justify-center gap-6 text-sm text-gray-300 sm:text-base md:text-lg"
		>
			<span><strong>Sortie :</strong> {formattedReleaseDate}</span>
			<span><strong>Durée :</strong> {formattedRuntime}</span>
			<span><strong>Note :</strong> {formattedVoteAvg} / 10</span>
			<span><strong>Budget :</strong> {formattedBudget} USD</span>
		</div>
		{#if trailer}
			<a
				href={`https://www.youtube.com/watch?v=${trailer.key}`}
				target="_blank"
				class="mt-8 inline-block rounded-full border-2 border-white px-6 py-2 text-sm font-medium uppercase transition hover:bg-white hover:text-black"
			>
				Voir la bande-annonce
			</a>
		{/if}
	</div>
</section>

<main class="mx-auto max-w-[90%] space-y-16 px-4 py-12">
	<!-- Synopsis Section -->
	<section class="flex flex-col items-center gap-6 md:flex-row">
		<!-- Affiche -->
		<div class="md:w-1/2">
			<div class="aspect-3/2 w-full md:aspect-2/3 lg:aspect-3/2">
				<img
					src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
					alt={`Affiche de ${movieData.title}`}
					class="h-full w-full rounded-lg object-cover shadow-lg"
				/>
			</div>
		</div>

		<!-- Texte Synopsis + Détails -->
		<div class="space-y-8 md:w-1/2">
			<!-- Synopsis -->
			<div>
				<h2 class="text-2xl font-semibold">Synopsis</h2>
				<p class="mt-2 text-gray-700">{movieData.overview}</p>
			</div>

			<!-- Détails sous le synopsis -->
			<div>
				<h2 class="mb-4 text-2xl font-semibold">Détails</h2>
				<div class="space-y-6">
					<!-- Langue originale -->
					<div class="rounded-lg bg-gray-50 p-4 shadow">
						<h3 class="font-medium">Langue originale</h3>
						<p class="text-gray-600">{movieData.original_language.toUpperCase()}</p>
					</div>
					<!-- Genres -->
					<div class="rounded-lg bg-gray-50 p-4 shadow">
						<h3 class="font-medium">Genres</h3>
						<p class="text-gray-600">
							{movieData.genres.map((g: { name: string }) => g.name).join(', ')}
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	{#if trailer}
		<section>
			<h2 class="mb-4 text-2xl font-semibold">Bande-annonce</h2>
			<div class="aspect-video w-full overflow-hidden rounded-lg shadow-lg">
				<iframe
					src={`https://www.youtube.com/embed/${trailer.key}`}
					title="Bande-annonce de {movieData.title}"
					allowfullscreen
					class="h-full w-full"
				></iframe>
			</div>
		</section>
	{/if}

	<!-- Cast Carousel -->
	<section class="relative -mx-4 md:-mx-6">
		<h2 class="mb-4 ml-4 text-2xl font-semibold md:mx-6">Casting principal</h2>

		{#if showLeft}
			<button
				on:click={() => scrollByAmount(-200)}
				class="absolute top-1/2 -left-8 z-10 flex hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white p-0 shadow transition duration-300 hover:bg-gray-100 md:-left-12 md:flex"
			>
				<span class="text-lg">&#8592;</span>
			</button>
		{/if}

		<div class="px-4 md:px-6">
			<ul
				bind:this={carousel}
				class="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-4 sm:gap-4"
			>
				{#each casts as cast}
					<li class="w-40 flex-shrink-0 snap-start sm:w-44 md:w-48">
						<div class="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg">
							<div class="aspect-square w-full overflow-hidden rounded-t-2xl">
								{#if cast.profile_path}
									<img
										src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
										alt={cast.name}
										class="h-full w-full object-cover"
									/>
								{:else}
									<div class="h-full w-full bg-gray-200"></div>
								{/if}
							</div>
							<div class="flex flex-grow flex-col p-3 sm:p-4">
								<h3 class="mb-1 text-left text-base font-semibold text-gray-900 sm:text-lg">
									{cast.name}
								</h3>
								<p class="line-clamp-2 flex-grow text-left text-sm text-gray-600">
									{cast.character || 'Rôle inconnu'}
								</p>
								<a
									href={`/acteur/${cast.id}`}
									class="mt-2 inline-flex items-center gap-1 self-start rounded-lg bg-blue-600 px-3 py-1 text-xs text-white transition duration-300 hover:bg-blue-700 sm:text-sm"
								>
									Voir Plus
								</a>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>

		{#if showRight}
			<button
				on:click={() => scrollByAmount(200)}
				class="absolute top-1/2 -right-8 z-10 flex hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white p-0 shadow transition duration-300 hover:bg-gray-100 md:-right-12 md:flex"
			>
				<span class="text-lg">&#8594;</span>
			</button>
		{/if}

		<div class="mt-2 flex justify-between md:hidden">
			<button
				on:click={() => scrollByAmount(-200)}
				class="flex h-10 w-10 items-center justify-center rounded-full bg-white p-0 shadow transition duration-300 hover:bg-gray-100"
				disabled={!showLeft}
			>
				<span class="text-lg">&#8592;</span>
			</button>
			<button
				on:click={() => scrollByAmount(200)}
				class="flex h-10 w-10 items-center justify-center rounded-full bg-white p-0 shadow transition duration-300 hover:bg-gray-100"
				disabled={!showRight}
			>
				<span class="text-lg">&#8594;</span>
			</button>
		</div>
	</section>
</main>
