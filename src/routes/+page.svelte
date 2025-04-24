<script lang="ts">
    import SearchBar from '../lib/components/SearchBar.svelte';
    import { searchMovies } from '../utils/searchMovies';
  
    let results: any[] = [];
    let query: string = '';
    let isLoading = false;
    let lastFetchTimestamp: number | null = null;
  
    const handleSearch = async (event: any) => {
        query = event.detail;
      const now = Date.now();
  
      // Throttling : évite trop de requêtes
      if (lastFetchTimestamp && now - lastFetchTimestamp < 300) {
        return;
      }
  
      lastFetchTimestamp = now;
      isLoading = true;
      try {
        results = await searchMovies(query);
      } catch (err) {
        console.error(err);
        results = [];
      } finally {
        isLoading = false;
      }
    };
  </script>
  
  {console.log(results, query)}


  <div class="container" style="max-width: 500px;">
    <SearchBar on:search={handleSearch} />
    <!-- Résultats -->
    {#if isLoading}
      <p class="text-center">Chargement...</p>
    {:else if results && results.length > 0}
      <ul>
        {#each results as result}
          <li class="flex items-center gap-3 border-b p-2">
            <a href={'/films/' + result.id} class="flex items-center gap-3">
              {#if result.poster_path}
                <img src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} alt={result.title} class="w-12 h-18" />
              {:else}
                <div class="w-12 h-18 bg-gray-200" ></div>
              {/if}
              <h3>{result.title}</h3>
            </a>
          </li>
        {/each}
      </ul>

        {:else if query.length > 0 && results && results.length === 0}
        <p class="text-center">Aucun film trouvé.</p>

        {:else if query && query.length === 0}
        <div></div>
    {/if}
  </div>
  