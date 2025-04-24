<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
    let query = '';
  
    // Appelé à chaque input (avec throttling à gérer au niveau parent si besoin)
    const handleInput = () => {
      dispatch('search', query);
    };
  
    // Appelé quand on clique sur "Search"
    const handleClick = () => {
      dispatch('search', query);
    };
  </script>
  
  <div class="flex w-full gap-2">
    <input 
      type="text"
      bind:value={query}
      placeholder="Rechercher un film..."
      on:input={handleInput}
      class="border rounded flex-1 p-2"
    />
    <button 
      on:click={handleClick}
      class="w-32 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
    >
      Search
    </button>
  </div>
  