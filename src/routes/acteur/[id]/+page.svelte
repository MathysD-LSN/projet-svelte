<script lang="ts">
	export let data;
	const { actorData, moviesData } = data;
	const { name, birthday, gender, profile_path, biography } = actorData;

	// Formattage français de la date de naissance
	$: formattedBirthday = birthday ? new Date(birthday).toLocaleDateString('fr-FR') : '';

	const sortedMovies = [...moviesData.cast]
		.sort((a, b) => {
			const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
			const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
			return dateB - dateA;
		})
		.slice(0, 5);
</script>

<main class="mx-auto max-w-[90%] space-y-12 px-4 py-8">
	<!-- Section Profil -->
	<section class="flex flex-col items-center gap-6 md:flex-row">
		<!-- Photo -->
		<div class="md:w-1/2">
			<div class="aspect-square w-full md:aspect-square lg:aspect-square">
				{#if profile_path}
					<img
						src={`https://image.tmdb.org/t/p/w500${profile_path}`}
						alt={name}
						class="h-full w-full rounded-lg object-cover shadow-lg"
					/>
				{:else}
					<div class="h-full w-full rounded-lg bg-gray-200"></div>
				{/if}
			</div>
		</div>

		<!-- Biographie + Détails -->
		<div class="space-y-8 md:w-1/2">
			<!-- Biographie -->
			{#if biography}
				<div>
					<h2 class="text-2xl font-semibold">Biographie</h2>
					<p class="mt-2 text-gray-700">{biography}</p>
				</div>
			{/if}

			<!-- Détails sous la biographie -->
			<div>
				<h2 class="mb-4 text-2xl font-semibold">Détails</h2>
				<div class="space-y-6">
					<!-- Date de naissance -->
					<div class="rounded-lg bg-gray-50 p-4 shadow">
						<h3 class="font-medium">Né le</h3>
						<p class="text-gray-600">{formattedBirthday}</p>
					</div>
					<!-- Genre -->
					<div class="rounded-lg bg-gray-50 p-4 shadow">
						<h3 class="font-medium">Genre</h3>
						<p class="text-gray-600">{gender === 1 ? 'Femme' : 'Homme'}</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Derniers films -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Derniers films</h2>
		<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
			{#each sortedMovies as movie}
				<a
					href={`/films/${movie.id}`}
					class="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:shadow-xl"
				>
					<div class="h-32 overflow-hidden rounded-t-2xl">
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
					<div class="p-4">
						<h3 class="mb-1 line-clamp-2 text-left text-sm font-semibold text-gray-900">
							{movie.title}
						</h3>
						<p class="text-left text-xs text-gray-600">
							{movie.release_date ? new Date(movie.release_date).toLocaleDateString('fr-FR') : ''}
						</p>
					</div>
				</a>
			{/each}
		</div>
	</section>
</main>
