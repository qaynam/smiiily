<script lang="ts">
  import { onMount } from 'svelte';
  import { twMerge } from 'tailwind-merge';

  let classes = '';
  let el: HTMLDivElement;
  let ref: (el: HTMLDivElement) => void = () => {};

  const defaultClass = 'p-5 rounded-lg';

  onMount(() => {
    ref(el);
  });

  $: divClasses = twMerge(defaultClass, classes);

  export { classes as class, ref };
</script>

<div class={divClasses} bind:this={el}>
  <slot />
</div>
