<script lang="ts">
    export let data;
    const { actorData, moviesData } = data;
    const { name, birthday, gender, profile_path } =  actorData;


    const sortedMovies = [...moviesData.cast].sort((a, b) => {
  const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
  const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
  return dateB - dateA;
  }).slice(0,5);

    console.log('Data:', data);
    console.log(sortedMovies);
  </script>
  
  <div class="flex gap-4">
    <div class="w-48 h-72">
        {#if profile_path}
              <img src={`https://image.tmdb.org/t/p/w500${profile_path}`} alt={name} />
            {:else}
              <div class="w-16 h-24 bg-gray-200"></div>
            {/if}
    </div>
    
    <div>
        <h1>{name}</h1>
        <p>{birthday}</p>
        {gender === 1 ? 'Femme' : 'Homme'}
  </div>
  </div>

<div class="mt-4">
    <h1 class="text-2xl">Derniers films</h1>
    <div class="flex gap-3 w-full">
        {#each sortedMovies as movie}
            <div class="w-100">
                <div>
                    {#if movie.poster_path}
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    {:else}
                        <div class="w-16 h-24 bg-gray-200"></div>
                    {/if}
                </div>
                <div>
                    <h2>{movie.title}</h2>
                    <p>{movie.release_date}</p>
                </div>
            </div>
        {/each}
    </div>
</div>
