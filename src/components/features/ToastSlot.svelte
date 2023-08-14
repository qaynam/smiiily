<script lang="ts">
  import { clsx } from "clsx";
  import { onMount } from "svelte";
  import { fade, slide } from "svelte/transition";
  import { twMerge } from "tailwind-merge";
  import { toastStore, type ToastOptions, type ToastType } from "~/stores";
  import Stack from "../basic/Stack.svelte";
  import CircleCheckFilledIcon from "../icons/CircleCheckFilledIcon.svelte";
  import CircleXIcon from "../icons/CircleXFilledIcon.svelte";

  let toastItem: ToastOptions[] = [];

  onMount(() => {
    const unsubscribe = toastStore.subscribe((value) => {
      toastItem = [...value.values()];
    });

    return () => {
      unsubscribe();
    };
  });

  const getToastBgColor = (type: ToastType) => {
    return {
      "border-green-500 bg-green-900/30 text-green-200": type === "success",
      "border-red-500 bg-red-900/30 text-red-200": type === "error",
      "bg-yellow-500": type === "warning",
      "bg-blue-500": type === "info"
    };
  };

  const getIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return CircleCheckFilledIcon;
      case "error":
        return CircleXIcon;
      default:
        break;
    }
  };

  const getIconStrokeColor = (type: ToastType) => {
    switch (type) {
      case "success":
        return "green";
      case "error":
        return "#dc2626";
      default:
        break;
    }
  };
</script>

<Stack class="fixed right-10 bottom-10 transition-all ease-in-out duration-300">
  {#each toastItem as item}
    <div
      in:slide
      out:fade
      class={twMerge(
        "rounded-lg p-3 border border-gray-400 backdrop-blur-sm text-white flex gap-2",
        // clsx(getToastBgColor(item.type))
        "bg-white drop-shadow-lg text-gray-800"
      )}
    >
      <svelte:component this={getIcon(item.type)} fillColor={getIconStrokeColor(item.type)} />
      <div>
        {item.message}
      </div>
    </div>
  {/each}
</Stack>
