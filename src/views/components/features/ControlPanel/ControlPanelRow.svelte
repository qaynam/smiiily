<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import Stack from "../../basic/Stack.svelte";

  export let labelIcon: new (...args: any[]) => SvelteComponent;
  export let label: string;
</script>

<Stack class="gap-3">
  <span class="font-bold text-white flex gap-1">
    <svelte:component this={labelIcon} />
    {label}
  </span>
  <div class="gap-3 flex flex-wrap">
    <slot />
  </div>
</Stack>
