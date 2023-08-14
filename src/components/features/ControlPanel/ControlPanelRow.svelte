<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import Stack from "~/components/basic/Stack.svelte";

  export let labelIcon: new (...args: any[]) => SvelteComponent;
  export let label: string;
</script>

<Stack class="gap-4">
  <span class="font-bold text-white flex gap-1">
    <svelte:component this={labelIcon} />
    {label}
  </span>
  <slot />
</Stack>
