<script lang="ts">
  import { clsx } from "clsx";
  import { SvelteComponent, createEventDispatcher } from "svelte";
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
  let loading = false;
  let clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch("click", {
      target: e.currentTarget
    });
  };
  let leftIcon: (new (...args: any[]) => SvelteComponent) | undefined = undefined;

  const defaultClass = "px-3 py-2 rounded-lg font-semibold";

  $: buttonClass = twMerge(
    clsx(defaultClass, classes, {
      "bg-transparent border border-gray-500 text-gray-200": outline,
      "hover:bg-gray-900 hover:border-gray-400": outline,
      "flex items-center justify-center gap-2": !!leftIcon,
      "disabled:opacity-50": disabled || loading,
      "cursor-progress": loading,
      "cursor-not-allowed": disabled
    })
  );

  export { classes as class, outline, disabled, loading, leftIcon };
</script>

<button class={buttonClass} on:click={clickHandler} disabled={disabled || loading}>
  {#if leftIcon}
    <svelte:component this={leftIcon} />
  {/if}
  <slot />
</button>
