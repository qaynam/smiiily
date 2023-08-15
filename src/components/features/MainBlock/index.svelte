<script lang="ts">
  import clsx from "clsx";
  import { twMerge } from "tailwind-merge";
  import Card from "~/components/basic/Card.svelte";
  import ImagePicker from "../ImagePicker.svelte";
  import { appStore } from "~/stores/app";
  import { domToBlob } from "~/lib/common";
  import { afterUpdate, createEventDispatcher, tick } from "svelte";

  export let gradient: string;
  export let padding: string;
  export let roundness: string;
  export let dropShadow: string;
  export let selectImageUrl: string;
  export let onImageChange: (e: CustomEvent<{ file: File }>) => void | Promise<void>;

  const updateHandler = async (el: HTMLDivElement | null) => {
    if (el) {
      let blob = await domToBlob(el);
      // TODO: fix this
      blob = await domToBlob(el);
      appStore.update((state) => {
        const newState = state;
        newState.mainBlockRef = el;
        newState.mainBlockImageBlob = blob;
        return newState;
      });
    }
  };
</script>

<Card
  onUpdate={updateHandler}
  class={twMerge(
    clsx(
      "lg:w-9/12 transition-all ease-in-out duration-300 min-h-[400px] overflow-hidden bg-transparent lg:block flex",
      gradient,
      padding,
      roundness
    )
  )}
>
  <div class="flex items-center justify-center m-auto w-full h-full">
    {#if selectImageUrl}
      <img
        src={selectImageUrl}
        class={twMerge(
          "mx-auto overflow-hidden object-cover transition-all duration-300",
          roundness,
          dropShadow
        )}
        alt=""
      />
    {:else}
      <ImagePicker on:change={onImageChange} />
    {/if}
  </div>
</Card>
