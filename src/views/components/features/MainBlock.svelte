<script lang="ts">
  import clsx from "clsx";
  import { twMerge } from "tailwind-merge";
  import { appStore } from "~/application/stores/app";
  import { domToBlob } from "~/lib/common";
  import Card from "../basic/Card.svelte";
  import ImagePicker from "./ImagePicker.svelte";
  import type { AppService } from "~/application/services/AppService";
  import { onMount } from "svelte";
  import { App } from "~/application/main";
  import { gradients } from "~/constants";

  let appService: AppService | undefined;

  const imageSelectedHandler = ({ file }: { file: File }) => {
    appService?.updateSelectedImage(file);
  };

  const updateHandler = async (el: HTMLDivElement | null) => {
    if (el) {
      appStore.update((state) => {
        const newState = state;
        newState.mainBlockRef = el;
        return newState;
      });
    }
  };

  $: currentGradient = $appStore.gradient;
  $: currentPadding = $appStore.padding;
  $: currentRoundness = $appStore.roundness;
  $: selectImageUrl = $appStore.selectedImage;
  $: currentDropShadow = $appStore.dropShadow;

  onMount(() => {
    appService = App.getAppService();
  });
</script>

<Card
  onMounted={updateHandler}
  class={twMerge(
    clsx(
      "lg:w-9/12 transition-all ease-in-out duration-300 min-h-[400px] overflow-hidden bg-transparent lg:block flex",
      gradients[currentGradient],
      currentPadding,
      currentRoundness
    )
  )}
>
  <div class="flex items-center justify-center m-auto w-full h-full">
    {#if selectImageUrl}
      <img
        src={selectImageUrl}
        class={twMerge(
          "mx-auto overflow-hidden object-cover transition-all duration-300",
          currentRoundness,
          currentDropShadow
        )}
        alt=""
      />
    {:else}
      <ImagePicker onImageSelected={imageSelectedHandler} />
    {/if}
  </div>
</Card>
