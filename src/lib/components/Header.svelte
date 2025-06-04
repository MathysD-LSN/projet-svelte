<script lang="ts">
	let menuOpen = false;
</script>

<!-- Header -->
<header class="fixed top-0 right-0 left-0 z-50 bg-blue-600 px-6 py-4 text-white shadow-md">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold"><a href="/">CineFilm</a></h1>

		<!-- Bouton hamburger mobile -->
		<button
			class="relative z-20 flex h-8 w-8 flex-col items-center justify-center space-y-1 sm:hidden"
			on:click={() => (menuOpen = !menuOpen)}
			aria-label="Toggle menu"
		>
			<span
				class="h-0.5 w-6 origin-center transform bg-white transition duration-300 ease-in-out"
				class:rotate-45={menuOpen}
				class:translate-y-1.5={menuOpen}
			></span>
			<span
				class="h-0.5 w-6 origin-center bg-white transition-opacity duration-300 ease-in-out"
				class:opacity-0={menuOpen}
			></span>
			<span
				class="h-0.5 w-6 origin-center transform bg-white transition duration-300 ease-in-out"
				class:-rotate-45={menuOpen}
				class:-translate-y-1.5={menuOpen}
			></span>
		</button>

		<!-- Menu desktop -->
		<nav class="hidden sm:block">
			<ul class="flex space-x-6 text-lg">
				<li><a href="/" class="transition duration-300 hover:text-blue-200">Accueil</a></li>
				<li>
					<a href="/catalogue" class="transition duration-300 hover:text-blue-200">Catalogue</a>
				</li>
			</ul>
		</nav>
	</div>

	<!-- Menu mobile superposé -->
	<nav
		class="absolute top-full right-4 left-4 mt-2 rounded-lg border border-gray-200 bg-white shadow-lg transition-all duration-300 sm:hidden"
		class:translate-y-0={menuOpen}
		class:-translate-y-[200%]={!menuOpen}
		class:opacity-100={menuOpen}
		class:opacity-0={!menuOpen}
	>
		<ul class="flex flex-col space-y-4 text-lg">
			<li class="rounded-lg px-4 pt-4 pb-2 transition duration-300 hover:bg-blue-50">
				<a
					href="/"
					on:click={() => (menuOpen = false)}
					class="block w-full text-blue-600 transition hover:text-blue-800"
				>
					Accueil
				</a>
			</li>
			<li class="rounded-lg px-4 pt-2 pb-4 transition duration-300 hover:bg-blue-50">
				<a
					href="/catalogue"
					on:click={() => (menuOpen = false)}
					class="block w-full text-blue-600 transition hover:text-blue-800"
				>
					Catalogue
				</a>
			</li>
		</ul>
	</nav>
</header>
