<script lang="ts">
  import { clsx } from 'clsx';
  import { onMount } from 'svelte';
  import { twMerge } from 'tailwind-merge';
  import { toastStore, type ToastOptions, type ToastType } from '~/stores';
  import { slide } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';

  let toastItem: ToastOptions[] = [];

  onMount(() => {
    const unsubscribe = toastStore.subscribe((value) => {
      toastItem = [...value.values()];
    });

    return () => {
      unsubscribe();
    };
  });

  const getStype = (type: ToastType) => {
    return {
      'bg-green-500': type === 'success',
      'bg-red-500': type === 'error',
      'bg-yellow-500': type === 'warning',
      'bg-blue-500': type === 'info'
    };
  };
</script>

{#if toastItem && toastItem.length > 0}
  {#each toastItem as item, index}
    <div
      transition:slide={{
        delay: 0,
        duration: 300,
        easing: cubicInOut
      }}
      class={twMerge(
        'rounded-lg p-5 border border-gray-400 fixed right-0 text-white',
        clsx(getStype(item.type))
      )}
      style={`bottom: ${(index + 1) * 5}rem; right: 2.5rem;`}
    >
      {item.message}
    </div>
  {/each}
{/if}
