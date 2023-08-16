<script lang="ts">
  import { afterUpdate, createEventDispatcher, onMount, tick } from "svelte";
  import { twMerge } from "tailwind-merge";
  import { appStore } from "~/application/stores/app";

  let classes = "";
  let currentRef: HTMLDivElement | null = null;
  let onMounted: (el: HTMLDivElement | null) => void | Promise<void> = () => {};
  const defaultClass = "p-5 rounded-lg";

  const eventHandler = () => {
    console.log("eventHandler");
  };

  $: divClasses = twMerge(defaultClass, classes);

  // onMount(async () => {
  //   await tick();
  //   onMounted(currentRef);
  // });

  onMount(
    appStore.subscribe(async () => {
      await tick();
      onMounted(currentRef);
    })
  );

  export { classes as class, onMounted };
</script>

<div class={divClasses} bind:this={currentRef}>
  <slot />
</div>
