<script lang="ts">
  import clsx from "clsx";
  import { afterUpdate, onMount, tick } from "svelte";
  import { twMerge } from "tailwind-merge";
  import { App } from "~/application/main";
  import type { AppService } from "~/application/services/AppService";
  import { appStore } from "~/application/stores/app";
  import { dropShadows, gradients, paddings, roundness } from "~/constants";
  import ImagePicker from "../ImagePicker.svelte";
  import Card from "../../basic/Card.svelte";

  let appService: AppService | undefined;
  const maxImageSize = 1024 * 1024 * 3; // 3MB
  let blockRef: HTMLDivElement;

  const imageSelectedHandler = ({ file }: { file: File }) => {
    appService?.updateSelectedImage(file);
  };

  $: currentGradient = gradients[$appStore.gradient];
  $: currentPadding = paddings[$appStore.padding];
  $: currentRoundness = roundness[$appStore.roundness];
  $: selectImageUrl = $appStore.selectedImage;
  $: currentDropShadow = dropShadows[$appStore.dropShadow];
  $: imageStyle = `transform: 
          perspective(1000px) 
          rotateX(${$appStore.rotate.y}deg) 
          rotateY(${$appStore.rotate.x}deg) 
          scale3d(1, 1, 1);
        `;

  onMount(async () => {
    appService = App.getAppService();
  });

  afterUpdate(() => {
    appService?.updateMainBlockElement(blockRef);
  });
</script>

<div
  class={clsx("w-full lg:w-9/12 flex lg:static mx-auto", {
    "sticky top-3 z-20": !!selectImageUrl
  })}
>
  <div
    class={clsx("mx-auto", {
      "w-full": !selectImageUrl
    })}
  >
    <div
      class={clsx("bg-white  transition-all ease-in-out duration-300", currentRoundness, {
        "w-full": !selectImageUrl
      })}
      bind:this={blockRef}
    >
      <Card
        class={twMerge(
          clsx(
            "bg-transparent transition-all ease-in-out duration-300 overflow-hidden flex",
            currentGradient,
            currentPadding,
            currentRoundness,
            {
              "lg:min-h-[800px] min-h-[400px] w-full h-full": !selectImageUrl
            }
          )
        )}
      >
        <div class="flex items-center justify-center m-auto">
          {#if selectImageUrl}
            <img
              src={selectImageUrl}
              class={twMerge(
                "mx-auto overflow-hidden object-cover transition-all duration-150 ease-linear",
                currentRoundness,
                currentDropShadow
              )}
              style={imageStyle}
              alt=""
            />
          {:else}
            <ImagePicker onImageSelected={imageSelectedHandler} {maxImageSize} />
          {/if}
        </div>
      </Card>
    </div>
  </div>
</div>
