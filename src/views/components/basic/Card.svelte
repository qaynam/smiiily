<script lang="ts">
  import { onMount, tick } from "svelte";
  import { twMerge } from "tailwind-merge";

  let classes = "";
  let currentRef: HTMLDivElement | null = null;
  let onMounted: (el: HTMLDivElement | null) => void | Promise<void> = () => {};
  const defaultClass = "p-5 rounded-lg";

  $: divClasses = twMerge(defaultClass, classes);

  onMount(async () => {
    await tick();
    onMounted(currentRef);
  });

  export { classes as class, onMounted };
</script>

<div class={divClasses} bind:this={currentRef}>
  <slot />
</div>
