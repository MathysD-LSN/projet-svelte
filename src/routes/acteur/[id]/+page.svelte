<script lang="ts">
    export let data;
    const { name, birthday, gender } = data;
    console.log('Data:', data);
  </script>
  
  <div class="flex gap-4">
    <div class="w-48 h-72">
        {#if data.profile_path}
              <img src={`https://image.tmdb.org/t/p/w500${data.profile_path}`} alt={data.name} />
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
  