<script lang="ts">
	export let error;
	export let status;
</script>

<svelte:head>
	<title>{status} - Page introuvable</title>
</svelte:head>

<div class="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50 px-4">
	<div class="w-full max-w-lg py-12 text-center">
		<h1 class="mb-6 text-6xl font-bold text-blue-600 sm:text-7xl">{status}</h1>

		<h2 class="mb-4 text-2xl font-semibold text-gray-800 sm:text-3xl">
			{status === 404 ? 'Page introuvable' : 'Une erreur est survenue'}
		</h2>

		<p class="mb-8 text-base text-gray-600 sm:text-lg">
			{error?.message ||
				"Désolé, la page que vous cherchez n'existe pas ou une erreur s'est produite."}
		</p>

		<a
			href="/"
			class="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-5 py-3 text-sm text-white transition hover:bg-blue-600 sm:text-base"
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
