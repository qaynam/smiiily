<script lang="ts">
  import { clsx } from 'clsx';
  import { createEventDispatcher } from 'svelte';
  import type { MouseEventHandler } from 'svelte/elements';
  import { twMerge } from 'tailwind-merge';

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

  $: hasIcon = !!$$slots.icon;
  $: buttonClass = twMerge(
    clsx(defaultClass, classes, {
      'bg-transparent border border-gray-500 text-gray-200': outline,
      'hover:bg-gray-900 hover:border-gray-400': outline,
      'flex items-center justify-center gap-2': hasIcon
    })
  );

  export { classes as class, outline };
</script>

<button class={buttonClass} on:click={clickHandler}>
  <slot name="icon" />
  <slot />
</button>
