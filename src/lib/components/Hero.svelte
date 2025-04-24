<script lang="ts">
	import SearchBar from './SearchBar.svelte';
	export let onSearch: (event: CustomEvent<string>) => void;
</script>

<section
	class="flex h-80 w-full items-center justify-center bg-cover bg-center bg-no-repeat sm:h-100 md:h-140"
	style="background-image: url('/images/hero-image.jpg');"
>
	<div class="flex h-full w-full flex-col justify-center bg-black/70 px-6 text-center text-white">
		<h1 class="mb-4 text-2xl font-bold sm:text-4xl md:text-5xl">Bienvenue sur CineApp</h1>
		<p class="mx-auto mb-6 max-w-lg text-sm sm:text-base md:text-lg">
			Découvrez les derniers films à l’affiche et trouvez votre prochain coup de cœur.
		</p>
		<div class="mx-auto mt-12 w-full px-4 md:max-w-lg lg:max-w-2xl">
			<SearchBar on:search={onSearch} />
		</div>
	</div>
</section>
