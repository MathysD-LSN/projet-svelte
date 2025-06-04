<script lang="ts">
	import { page } from '$app/stores';
	$: status = $page.status;

	// Liste des codes pour lesquels on a une image dédiée
	const knownStatuses = [400, 401, 403, 404, 500];

	// Message associé à chaque code d'erreur
	$: message =
		status === 400
			? 'Requête invalide'
			: status === 401
				? 'Non autorisé'
				: status === 403
					? 'Accès interdit'
					: status === 404
						? 'Page introuvable'
						: status === 500
							? 'Erreur serveur'
							: 'Une erreur est survenue';

	// Booléen pour savoir si on a une image spécifique pour ce code
	$: hasImage = knownStatuses.includes(status);

	// Chemin vers l’image uniquement si le code est connu
	$: imagePath = hasImage ? `/images/${status}.png` : '';
</script>

<div class="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50 px-4">
	<div class="w-full max-w-lg py-12 text-center">
		{#if hasImage}
			<img src={imagePath} alt="Erreur" class="mx-auto mb-6 h-40 object-contain sm:h-52" />
		{:else}
			<h1 class="mb-6 text-6xl font-bold text-blue-700 sm:text-7xl">Erreur</h1>
		{/if}

		<h2 class="mb-4 text-2xl font-semibold text-gray-800 sm:text-3xl">
			{message}
		</h2>

		<p class="mb-8 text-base text-gray-600 sm:text-lg">
			Désolé, une erreur est survenue pendant la navigation.
		</p>

		<a
			href="/"
			class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm text-white transition hover:bg-blue-700 sm:text-base"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 19l-7-7m0 0l7-7m-7 7h18"
				/>
			</svg>
			Retour à l’accueil
		</a>
	</div>
</div>
