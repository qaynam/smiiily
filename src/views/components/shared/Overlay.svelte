<script lang="ts">
  import { clsx } from "clsx";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let ref: HTMLDivElement;
  export let show = false;

  $: {
    if (ref && ref.parentElement) {
      ref.parentElement.style.position = "relative";
    }
  }
</script>

{#if show}
  <div
    transition:fade
    bind:this={ref}
    class={clsx(
      "absolute inset-0 h-full w-full bg-black/50 backdrop-blur-lg p-4 flex items-center justify-center z-10"
    )}
  >
    <slot />
  </div>
{/if}
