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
  import { onMount } from "svelte";
  import { twMerge } from "tailwind-merge";
  import { App } from "~/application/main";
  import type { PaddingType } from "~/application/models/appStore";
  import type {
    DropShadowType,
    GradientType,
    RoundnessType
  } from "~/application/models/appStore.js";
  import type { AppService } from "~/application/services/AppService";
  import { appStore, domImage } from "~/application/stores/app";
  import {
    dropShadowTypes,
    gradientTypes,
    gradients,
    imageTypes,
    paddingTypes,
    roundnessTypes
  } from "~/constants";
  import { GA, GAActions } from "~/lib/ga";
  import { Toast } from "~/lib/toast";
  import { camelToPascal, copyBlobToClipBoard, downloadFromBlob } from "~/lib/utils";
  import AnimatedLoading from "~/views/components/basic/AnimatedLoading.svelte";
  import Overlay from "~/views/components/shared/Overlay.svelte";
  import { Button, Card, Stack } from "../../basic";
  import FileStackIcon from "../../icons/FileStackIcon.svelte";
  import RotateClockWiseIcon from "../../icons/RotateClockWiseIcon.svelte";
  import ControlPanelRow from "./ControlPanelRow.svelte";

  let appService: AppService | undefined;

  const removeImage = () => {
    appService?.removeImage();
    GA.sendEvent(GAActions.CLICK, "remove-image");
  };

  const saveImage = async () => {
    if (mainBlockDomImage) {
      downloadFromBlob(mainBlockDomImage);
      GA.sendEvent(
        GAActions.CLICK,
        "save-image",
        JSON.stringify({
          roundness: currentRoundness,
          padding: currentPadding,
          dropShadow: currentDropShadow,
          gradient: currentGradient
        })
      );
    } else {
      Toast.show("No image to save", "error");
    }
  };

  const copyImage = async () => {
    if (mainBlockDomImage) {
      try {
        await copyBlobToClipBoard(mainBlockDomImage, mainBlockDomImage.type);
        Toast.show("Copied to clipboard", "success");
        GA.sendEvent(
          GAActions.CLICK,
          "copy-image",
          JSON.stringify({
            roundness: currentRoundness,
            padding: currentPadding,
            dropShadow: currentDropShadow,
            gradient: currentGradient
          })
        );
      } catch (error) {
        Toast.show("Failed to copy", "error");
        GA.sendEvent(
          GAActions.CLICK,
          "copy-image-failed",
          JSON.stringify({
            roundness: currentRoundness,
            padding: currentPadding,
            dropShadow: currentDropShadow,
            gradient: currentGradient
          })
        );
      }
    } else {
      Toast.show("No image to copy", "error");
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
  $: mainBlockDomImage = $domImage.blob;
  $: loading = $domImage.processing;

  onMount(() => {
    appService = App.getAppService();
  });
</script>

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
    <div>
      <p class="text-gray-400 text-sm">
        You can copy or save the image below. The image will be saved with the current settings.
      </p>
    </div>
    <div class="flex flex-col gap-4">
      <Overlay show={loading}>
        <AnimatedLoading />
      </Overlay>
      <div class="flex justify-between gap-4">
        <Button leftIcon={CopyIcon} {loading} class={"w-full"} outline on:click={copyImage}>
          <span> Copy </span>
        </Button>
        <Button
          {loading}
          leftIcon={DownloadIcon}
          class="bg-blue-600 hover:bg-blue-500 text-white w-full"
          on:click={saveImage}
        >
          <span> Save </span>
        </Button>
      </div>
      {#if mainBlockDomImage}
        <Button {loading} leftIcon={RotateClockWiseIcon} outline on:click={removeImage}>
          <span> Remove Image </span>
        </Button>
      {/if}
    </div>
  </Stack>
</Card>
