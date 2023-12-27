<script lang="ts">
  import clsx from "clsx";
  import { SvelteComponent, afterUpdate, onMount, tick } from "svelte";
  import { twMerge } from "tailwind-merge";
  import { App } from "~/application/main";
  import type { AppService } from "~/application/services/AppService";
  import { appStore } from "~/application/stores/app";
  import { dropShadows, gradients, paddings, roundness } from "~/constants";
  import ImagePicker from "../ImagePicker.svelte";
  import Card from "../../basic/Card.svelte";

  const maxImageSize = 1024 * 1024 * 3; // 3MB
  let appService: AppService | undefined;
  let blockRef: HTMLDivElement;
  let imageRef: HTMLImageElement;
  let frameAspectRatio = "aspect-[4/3]";

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
  $: {
    (async () => {
      await tick();
      if (selectImageUrl) {
        const gcd = (a: number, b: number): number => {
          return b == 0 ? a : gcd(b, a % b);
        };

        const w = imageRef.naturalWidth;
        const h = imageRef.naturalHeight;
        const r = gcd(w, h);
        console.log(imageRef.offsetWidth);
        console.log(`aspect-[${w / r}/${h / r}]`);
        frameAspectRatio = `aspect-[${w / r}/${h / r}]`;
      } else {
        frameAspectRatio = "aspect-[4/3]";
      }
    })();
  }

  onMount(async () => {
    appService = App.getAppService();
  });

  afterUpdate(() => {
    appService?.updateMainBlockElement(blockRef);
  });
</script>

<div
  class={clsx(
    "bg-transparent flex transition-all ease-in-out duration-300 h-full p-10",
    currentRoundness
  )}
>
  <Card
    onMounted={(el) => {
      el != null && (blockRef = el);
    }}
    class={twMerge(
      clsx(
        "bg-transparent transition-all ease-in-out duration-300 overflow-hidden flex h-[70%] m-auto relative",
        currentGradient,
        currentPadding,
        currentRoundness,
        frameAspectRatio
      )
    )}
  >
    <div class="flex items-center justify-center m-auto">
      <img
        bind:this={imageRef}
        class={twMerge(
          clsx(
            "mx-auto overflow-hidden object-cover transition-all w-full h-full duration-150 ease-linear",
            currentRoundness,
            currentDropShadow,
            frameAspectRatio
          )
        )}
        src={selectImageUrl}
        on:load={(e) => {
          e.currentTarget.classList.remove("hidden");
          console.log(e.currentTarget.clientWidth);
        }}
        style={imageStyle}
        alt=""
      />
      {#if !selectImageUrl}
        <ImagePicker onImageSelected={imageSelectedHandler} {maxImageSize} />
      {/if}
    </div>
  </Card>
</div>
