<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import { HStack } from "~/views/components/basic";

  export let labelIcon: (new (...args: any[]) => SvelteComponent) | undefined = undefined;
  export let label: string;
</script>

<HStack class="gap-3">
  <span class="font-bold text-white flex gap-1">
    {#if labelIcon}
      <svelte:component this={labelIcon} />
    {/if}
    {label}
  </span>
  <div class="gap-3 flex flex-wrap">
    <slot />
  </div>
</HStack>
