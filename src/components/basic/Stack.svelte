<script lang="ts">
  import { clsx } from "clsx";

  let classes = "";

  const defaultClasses = "flex flex-col gap-4";

  $: stackClasses = clsx(defaultClasses, classes);

  export { classes as class };
</script>

<div class={stackClasses}>
  <slot />
</div>
