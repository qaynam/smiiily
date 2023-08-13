<script lang="ts">
  import { clsx } from 'clsx';
  import { createEventDispatcher } from 'svelte';
  import type { MouseEventHandler } from 'svelte/elements';

  const dispatch = createEventDispatcher<{
    click: {
      event: MouseEvent;
    };
  }>();

  let classes = '';
  let outline = false;
  let clickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch('click', {
      event: new MouseEvent('click')
    });
  };

  const defaultClass = 'px-3 py-2 rounded-lg font-semibold';

  $: buttonClass = clsx(defaultClass, classes, {
    'bg-transparent border border-gray-500 text-gray-200': outline,
    'hover:bg-gray-900 hover:border-gray-400': outline
  });

  export { classes as class, outline };
</script>

<button class={buttonClass} on:click={clickHandler}>
  <slot />
</button>
