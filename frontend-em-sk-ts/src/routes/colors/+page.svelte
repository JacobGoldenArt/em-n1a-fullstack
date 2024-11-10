<script lang="ts">
  // Extract color variables from CSS
  const colors = {
    'Blacks': {
      'faded-black-tee': 'var(--faded-black-tee)',
      'black-jeans': 'var(--black-jeans)',
      'fade-to-black': 'var(--fade-to-black)',
      'pretty-much-black': 'var(--pretty-much-black)',
      'cinema-black': 'var(--cinema-black)',
      'black': 'var(--black)',
      'darkroom-main-bg': 'var(--darkroom-main-bg)',
      'sidebar-panel-faded-blk': 'var(--sidebar-panel-faded-blk)',
      'faded-darkish-1': 'var(--faded-darkish-1)',
      'faded-darkish-2': 'var(--faded-darkish-2)',
      'secondary-darker-bg': 'var(--secondary-darker-bg)',
      'secondary-darker-bg2': 'var(--secondary-darker-bg2)',
    },
    'Whites': {
      'pure-white': 'var(--pure-white)',
      'pretty-much-white': 'var(--pretty-much-white)',
      'text-fade-wht': 'var(--text-fade-wht)',
      'offwhite-text': 'var(--offwhite-text)',
      'cream-bg-1': 'var(--cream-bg-1)',
    },
    'Tans': {
      'tan-text': 'var(--tan-text)',
      'caramel1': 'var(--caramel1)',
    },
    'Greys and Blues': {
      'grey-ghost': 'var(--grey-ghost)',
      'subtle-grey': 'var(--subtle-grey)',
      'subtle-grey-fill': 'var(--subtle-grey-fill)',
      'secondary-grey-bg': 'var(--secondary-grey-bg)',
      'very-faded-blue-text': 'var(--very-faded-blue-text)',
      'tertiary-blue-grey': 'var(--tertiary-blue-grey)',
    },
    'Pinks': {
      'pink-tee': 'var(--pink-tee)',
      'pepto-pink': 'var(--pepto-pink)',
      'pink-panther': 'var(--pink-panther)',
      'faded-pink-text-area': 'var(--faded-pink-text-area)',
      'faded-pink-1': 'var(--faded-pink-1)',
      'warm-pink': 'var(--warm-pink)',
      'faded-pink2': 'var(--faded-pink2)',
    },
    'Pops': {
      'teal1-pop': 'var(--teal1-pop)',
      'teal2-pop': 'var(--teal2-pop)',
      'teal3-pop': 'var(--teal3-pop)',
      'intense-orange-pop': 'var(--intense-orange-pop)',
    },
  };
</script>

<div class="container">
  {#each Object.entries(colors) as [category, colorGroup]}
    <div class="category">
      <h2>{category}</h2>
      <div class="color-grid">
        {#each Object.entries(colorGroup) as [name, value]}
          <div class="color-item">
            <div class="color-square" style="background-color: {value}"></div>
            <span class="color-name">{name}</span>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .container {
    padding: 2rem;
    font-family: var(--body-1);
  }

  .category {
    margin-bottom: 2rem;
  }

  h2 {
    font-family: var(--heading-1);
    margin-bottom: 1rem;
    color: var(--offwhite-text);
  }

  .color-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .color-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .color-square {
    width: 200px;
    height: 200px;
    border-radius: 8px;
    /* border: 1px solid var(--subtle-grey);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  }

  .color-name {
    font-size: 0.9rem;
    text-align: center;
    color: var(--offwhite-text);
  }
</style> 