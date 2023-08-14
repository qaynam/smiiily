<script lang="ts">
  import { onMount } from "svelte";
  import { fade, slide } from "svelte/transition";
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

  const getIconColor = (type: ToastType) => {
    switch (type) {
      case "success":
        return "text-green-500";
      case "error":
        return "text-red-500";
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
      class="bg-white drop-shadow-lg rounded-lg p-3 border border-gray-400 backdrop-blur-sm flex gap-2 text-neutral-800"
    >
      <svelte:component this={getIcon(item.type)} class={getIconColor(item.type)} />
      <div>
        {item.message}
      </div>
    </div>
  {/each}
</Stack>
