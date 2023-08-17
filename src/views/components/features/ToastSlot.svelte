<script lang="ts">
  import { onMount } from "svelte";
  import { fade, slide } from "svelte/transition";
  import { Toast } from "~/lib/toast";
  import Stack from "../basic/Stack.svelte";
  import CircleCheckFilledIcon from "../icons/CircleCheckFilledIcon.svelte";
  import CircleXIcon from "../icons/CircleXFilledIcon.svelte";
  import type { ToastOptions, ToastType, Toasts } from "~/application/stores/toast";

  let toastItems: ToastOptions[] = [];

  const toastChangeHandler = (value: Toasts) => {
    toastItems = Object.values(value) as ToastOptions[];
  };

  onMount(() => {
    const unsubscribe = Toast.subscribe(toastChangeHandler);

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

<Stack
  class="fixed lg:right-10 lg:bottom-10 lg:left-auto lg:top-auto lg:translate-x-0 top-4 left-0 right-0 lg:px-0 px-4 lg:transform-none transition-all ease-in-out duration-300 gap-3 z-10"
>
  {#each toastItems as item}
    <div class="flex justify-center" on:click|stopPropagation|preventDefault>
      <div
        in:slide
        out:fade
        class="bg-white shadow-xl rounded-lg p-3 border border-gray-400 backdrop-blur-sm flex flex-row gap-2 text-neutral-800"
      >
        <svelte:component this={getIcon(item.type)} class={getIconColor(item.type)} />
        <div>
          {item.message}
        </div>
      </div>
    </div>
  {/each}
</Stack>
