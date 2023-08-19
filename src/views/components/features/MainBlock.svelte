<script lang="ts">
  import clsx from "clsx";
  import { afterUpdate, onMount, tick } from "svelte";
  import { twMerge } from "tailwind-merge";
  import { App } from "~/application/main";
  import type { AppService } from "~/application/services/AppService";
  import { appStore } from "~/application/stores/app";
  import { dropShadows, gradients, paddings, roundness } from "~/constants";
  import Card from "../basic/Card.svelte";
  import ImagePicker from "./ImagePicker.svelte";

  let appService: AppService | undefined;
  const maxImageSize = 1024 * 1024 * 3; // 3MB

  const imageSelectedHandler = ({ file }: { file: File }) => {
    appService?.updateSelectedImage(file);
  };

  const domChangeHandler = async (el: HTMLDivElement | null) => {
    if (!el) {
      return;
    }
    await tick();
    appService?.updateMainBlockElement(el);
  };

  $: currentGradient = gradients[$appStore.gradient];
  $: currentPadding = paddings[$appStore.padding];
  $: currentRoundness = roundness[$appStore.roundness];
  $: selectImageUrl = $appStore.selectedImage;
  $: currentDropShadow = dropShadows[$appStore.dropShadow];

  onMount(async () => {
    appService = App.getAppService();
  });
</script>

<Card
  onMounted={domChangeHandler}
  class={twMerge(
    clsx(
      "lg:w-9/12 w-full bg-transparent transition-all ease-in-out duration-300 lg:min-h-[800px] min-h-[400px] overflow-hidden flex",
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
          "mx-auto overflow-hidden object-cover transition-all duration-100 ease-in-out",
          currentRoundness,
          currentDropShadow
        )}
        style={`transform: rotate3d(1,0,0,${$appStore.rotate.z}deg);`}
        alt=""
      />
    {:else}
      <ImagePicker onImageSelected={imageSelectedHandler} {maxImageSize} />
    {/if}
  </div>
</Card>
