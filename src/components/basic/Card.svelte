<script lang="ts">
  import { afterUpdate, createEventDispatcher, onMount, tick } from "svelte";
  import { twMerge } from "tailwind-merge";

  let classes = "";
  let currentRef: HTMLDivElement | null = null;
  let onUpdate: (el: HTMLDivElement | null) => void | Promise<void> = () => {};
  let mounted = false;
  const defaultClass = "p-5 rounded-lg";

  $: divClasses = twMerge(defaultClass, classes);

  onMount(() => {
    mounted = true;
    return () => {
      mounted = false;
    };
  });

  afterUpdate(async () => {
    if (!currentRef || !mounted) {
      return;
    }
    onUpdate(currentRef);
  });

  export { classes as class, onUpdate };
</script>

<div id="hello" class={divClasses} bind:this={currentRef}>
  <slot />
</div>
