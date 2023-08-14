<script lang="ts">
  import { clsx } from "clsx";
  import { createEventDispatcher } from "svelte";
  import type { MouseEventHandler } from "svelte/elements";
  import { twMerge } from "tailwind-merge";

  const dispatch = createEventDispatcher<{
    click: {
      target: HTMLButtonElement;
    };
  }>();

  let classes = "";
  let outline = false;
  let disabled = false;
  let clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch("click", {
      target: e.currentTarget
    });
  };

  const defaultClass = "px-3 py-2 rounded-lg font-semibold";

  $: hasIcon = !!$$slots.icon;
  $: buttonClass = twMerge(
    clsx(defaultClass, classes, {
      "bg-transparent border border-gray-500 text-gray-200": outline,
      "hover:bg-gray-900 hover:border-gray-400": outline,
      "flex items-center justify-center gap-2": hasIcon,
      "cursor-not-allowed disabled:opacity-50": disabled
    })
  );

  export { classes as class, outline, disabled };
</script>

<button class={buttonClass} on:click={clickHandler} {disabled}>
  <slot name="icon" />
  <slot />
</button>
