<script lang="ts">
  import {
    BoxPaddingIcon,
    CopyIcon,
    DownloadIcon,
    PaletteIcon,
    RadiusTopLeftIcon,
    ShadowIcon
  } from "@icons/index";
  import { clsx } from "clsx";
  import { onMount, tick } from "svelte";
  import { twMerge } from "tailwind-merge";
  import { App } from "~/application/main";
  import type { AppService } from "~/application/services/AppService";
  import { appStore } from "~/application/stores/app";
  import {
    paddingTypes,
    roundnessTypes,
    dropShadowTypes,
    gradients,
    gradientTypes
  } from "~/constants";
  import { camelToPascal, copyBlobToClipBoard } from "~/lib/common";
  import Card from "../../basic/Card.svelte";
  import Stack from "../../basic/Stack.svelte";
  import ControlPanelRow from "./ControlPanelRow.svelte";
  import type {
    DropShadowType,
    RoundnessType,
    GradientType
  } from "~/application/models/appStore.js";
  import type { PaddingType } from "~/application/models/appStore";
  import Button from "../../basic/Button.svelte";
  import RotateClockWiseIcon from "../../icons/RotateClockWiseIcon.svelte";

  let appService: AppService | undefined;

  const onRemoveImage = () => {
    appService?.removeImage();
  };

  const saveImage = () => {};

  const copyImage = async () => {
    if (mainBlockDomImage) {
      await copyBlobToClipBoard(mainBlockDomImage, mainBlockDomImage.type);
    }
  };

  const onRoundnessChange = (roundnessKey: RoundnessType) => {
    appService?.updateRoundness(roundnessKey);
  };

  const onPaddingChange = (paddingType: PaddingType) => {
    appService?.updatePadding(paddingType);
  };

  const onDropShadowChange = (dropShadowType: DropShadowType) => {
    appService?.updateDropShadow(dropShadowType);
  };

  const onGradientChange = (gradientType: GradientType) => {
    appService?.updateGradient(gradientType);
  };

  $: currentRoundness = $appStore.roundness;
  $: currentPadding = $appStore.padding;
  $: currentDropShadow = $appStore.dropShadow;
  $: currentGradient = $appStore.gradient;
  $: imageSelected = !!$appStore.selectedImage;
  $: mainBlockDomImage = $appStore.mainBlockDomImage;

  onMount(() => {
    appService = App.getAppService();
  });
</script>

<pre>
  {JSON.stringify($appStore, null, 2)}
</pre>

<Card class="border border-gray-600 lg:w-3/12 w-full self-start">
  <Stack class="gap-10">
    <ControlPanelRow labelIcon={RadiusTopLeftIcon} label="Roundness">
      {#each roundnessTypes as roundnessType}
        <button
          class={twMerge(
            clsx("text-white", {
              "border-b border-white": currentRoundness === roundnessType
            })
          )}
          on:click={() => onRoundnessChange(roundnessType)}
        >
          {camelToPascal(roundnessType)}
        </button>
      {/each}
    </ControlPanelRow>
    <ControlPanelRow labelIcon={BoxPaddingIcon} label="Padding">
      {#each paddingTypes as paddingType}
        <button
          class={clsx("text-white", {
            "border-b border-white": currentPadding === paddingType
          })}
          on:click={() => onPaddingChange(paddingType)}
        >
          {camelToPascal(paddingType)}
        </button>
      {/each}
    </ControlPanelRow>
    <ControlPanelRow labelIcon={ShadowIcon} label="Drop Shadow">
      <div class="gap-3 flex flex-wrap">
        {#each dropShadowTypes as dropShadowType}
          <button
            class={clsx("text-white", {
              "border-b border-white": currentDropShadow === dropShadowType
            })}
            on:click={() => onDropShadowChange(dropShadowType)}
          >
            {camelToPascal(dropShadowType)}
          </button>
        {/each}
      </div>
    </ControlPanelRow>
    <ControlPanelRow labelIcon={PaletteIcon} label="Gradients">
      <div class="flex flex-wrap gap-3">
        {#each gradientTypes as gradientType}
          <button
            class={twMerge(
              gradients[gradientType],
              "w-10 h-10 rounded-lg",
              clsx({
                "ring-2 ring-white": currentGradient === gradientType
              })
            )}
            on:click={() => onGradientChange(gradientType)}
          />
        {/each}
      </div>
    </ControlPanelRow>
    <hr class="border-gray-600" />
    <div class="flex justify-between gap-4">
      <Button class="w-full" outline on:click={copyImage}>
        <CopyIcon slot="icon" />
        <span> Copy </span>
      </Button>
      <Button class="bg-blue-600 hover:bg-blue-500 text-white w-full" on:click={saveImage}>
        <DownloadIcon slot="icon" />
        <span> Save </span>
      </Button>
    </div>
    {#if imageSelected}
      <Button outline on:click={onRemoveImage}>
        <RotateClockWiseIcon slot="icon" />
        <span> Remove Image </span>
      </Button>
    {/if}
  </Stack>
</Card>
