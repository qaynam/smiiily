<script lang="ts">
  import { clsx } from "clsx";
  import { twMerge } from "tailwind-merge";

  let classes = "";

  const defaultClasses = "flex flex-col gap-4";

  $: stackClasses = twMerge(clsx(defaultClasses, classes));

  export { classes as class };
</script>

<div class={stackClasses}>
  <slot />
</div>
