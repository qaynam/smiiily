<script lang="ts">
  import clsx from "clsx";
  import { twMerge } from "tailwind-merge";
  import { appStore } from "~/application/stores/app";
  import { domToBlob, isSameBlob } from "~/lib/common";
  import Card from "../basic/Card.svelte";
  import ImagePicker from "./ImagePicker.svelte";
  import type { AppService } from "~/application/services/AppService";
  import { afterUpdate, onMount, tick } from "svelte";
  import { App } from "~/application/main";
  import { dropShadows, gradients, paddings, roundness } from "~/constants";

  let appService: AppService | undefined;
  let mainBlockRef: Element | null = null;

  const imageSelectedHandler = ({ file }: { file: File }) => {
    appService?.updateSelectedImage(file);
  };

  const updateHandler = async (el: HTMLDivElement | null) => {
    if (el && !getMainBlockElement()) {
      await tick();
      await appService?.updateMainBlockElement(el);
    }
  };

  $: currentGradient = gradients[$appStore.gradient];
  $: currentPadding = paddings[$appStore.padding];
  $: currentRoundness = roundness[$appStore.roundness];
  $: selectImageUrl = $appStore.selectedImage;
  $: currentDropShadow = dropShadows[$appStore.dropShadow];

  const getMainBlockElement = () => {
    let el: Element | null = null;
    appStore.subscribe((store) => (el = store.mainBlockRef))();
    return el;
  };

  onMount(() => {
    appService = App.getAppService();
  });

  afterUpdate(async () => {
    await tick();
    console.log("Updated");
  });
</script>

<Card
  onMounted={updateHandler}
  class={twMerge(
    clsx(
      "lg:w-9/12 transition-all ease-in-out duration-300 min-h-[400px] overflow-hidden bg-transparent lg:block flex",
      currentGradient,
      currentPadding,
      currentRoundness
    )
  )}
>
  <div class="flex items-center justify-center m-auto min-h-full w-full h-full">
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
