<script lang="ts">
  export let data;
  const { movieData, alternativeMovies, credits } = data;
  const casts = credits.cast.slice(0, 5);
  console.log('Movie data:', data);
</script>

<h1 class="text-3xl">{movieData.title}</h1>
<p>{movieData.overview}</p>


<!-- Casting -->
<h2 class="text-2xl mt-2">Casting</h2>
<div class="flex gap-4">
  {#each casts as cast}
      <a href="/acteur/{cast.id}">
        <div class="flex flex-col items-center gap-2">
          <div class="w-full">
            {#if cast.profile_path}
              <img src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} alt={cast.name} />
            {:else}
              <div class="w-16 h-24 bg-gray-200"></div>
            {/if}
          </div>
          <div>
            <h2>{cast.name}</h2>
            <p>{cast.character}</p>
          </div>
        </div>
      </a>
  {/each}
</div>