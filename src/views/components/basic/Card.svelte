<script lang="ts">
  import { afterUpdate, onMount, tick } from "svelte";
  import { twMerge } from "tailwind-merge";

  let classes = "";
  let currentRef: HTMLDivElement | null = null;
  let onMounted: (el: HTMLDivElement | null) => void | Promise<void> = () => {};
  const defaultClass = "p-5 rounded-lg";

  $: divClasses = twMerge(defaultClass, classes);

  // onMount(async () => {
  //   await tick();
  //   onMounted(currentRef);
  // });

  // const mounted = (node: Element) => {
  //   currentRef = node as HTMLDivElement;
  //   console.log(currentRef);
  //   onMounted(currentRef);
  // };

  // onMount(
  //   appStore.subscribe(async () => {
  //     await tick();
  //     onMounted(currentRef);
  //   })
  // );
  onMount(async () => {
    await tick();
    onMounted(currentRef);
  });
  // afterUpdate(async () => {
  //   await tick();
  //   onMounted(currentRef);
  // });

  export { classes as class, onMounted };
</script>

<div id="MainBlock" class={divClasses} bind:this={currentRef}>
  <slot />
</div>
