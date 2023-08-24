<script lang="ts">
  import {
    BoxPaddingIcon,
    CopyIcon,
    DownloadIcon,
    PaletteIcon,
    RadiusTopLeftIcon,
    ShadowIcon,
    ThreeDRotateIcon
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
    paddingTypes,
    roundnessTypes
  } from "~/constants";
  import { copyBlobToClipBoard, downloadFromBlob } from "~/lib/core";
  import { GA, GAActions } from "~/lib/ga";
  import { Toast } from "~/lib/toast";
  import { camelToPascal, isSPView } from "~/lib/utils";
  import AnimatedLoading from "~/views/components/basic/AnimatedLoading.svelte";
  import Overlay from "~/views/components/shared/Overlay.svelte";
  import { Button, Card, Stack } from "../../basic";
  import RotateClockWiseIcon from "../../icons/RotateClockWiseIcon.svelte";
  import ControlPanelRow from "./ControlPanelRow.svelte";
  import RotateDrawer from "./RotateDrawer.svelte";
  import BuyMeACoffeeBlock from "../BuyMeACoffeeBlock.svelte";

  let appService: AppService | undefined;
  let rotateDrawerRef: { force: (position: { x: number; y: number }) => void };

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
    GA.sendEvent(
      GAActions.CLICK,
      "roundness-change",
      JSON.stringify({
        roundness: currentRoundness,
        padding: currentPadding,
        dropShadow: currentDropShadow,
        gradient: currentGradient
      })
    );
  };

  const onPaddingChange = (paddingType: PaddingType) => {
    appService?.updatePadding(paddingType);
    GA.sendEvent(
      GAActions.CLICK,
      "padding-change",
      JSON.stringify({
        roundness: currentRoundness,
        padding: currentPadding,
        dropShadow: currentDropShadow,
        gradient: currentGradient
      })
    );
  };

  const onDropShadowChange = (dropShadowType: DropShadowType) => {
    appService?.updateDropShadow(dropShadowType);
    GA.sendEvent(
      GAActions.CLICK,
      "drop-shadow-change",
      JSON.stringify({
        roundness: currentRoundness,
        padding: currentPadding,
        dropShadow: currentDropShadow,
        gradient: currentGradient
      })
    );
  };

  const onGradientChange = (gradientType: GradientType) => {
    appService?.updateGradient(gradientType);
    GA.sendEvent(
      GAActions.CLICK,
      "gradient-change",
      JSON.stringify({
        roundness: currentRoundness,
        padding: currentPadding,
        dropShadow: currentDropShadow,
        gradient: currentGradient
      })
    );
  };

  const rotateChangeHandler = (value: { x: number; y: number }) => {
    const img = $appStore.mainBlockRef?.querySelector("img");
    if (!img) {
      return;
    }

    // rotate controller max moving distance is 14px
    // so we need to add 11px to the value because we want to rotate the image max -+25deg
    // and we also need to keep minus axis value
    const absValue = {
      x: Math.abs(value.x) + 11,
      y: Math.abs(value.y) + 11
    };
    $appStore.rotate = {
      x: value.x === 0 ? 0 : absValue.x * (value.x > 0 ? 1 : -1),
      y: value.y === 0 ? 0 : absValue.y * (value.y > 0 ? 1 : -1)
    };
  };

  $: currentRoundness = $appStore.roundness;
  $: currentPadding = $appStore.padding;
  $: currentDropShadow = $appStore.dropShadow;
  $: currentGradient = $appStore.gradient;
  $: mainBlockDomImage = $domImage.blob;
  $: loading = $domImage.processing;
  $: rotateChanged = $appStore.rotate.x !== 0 || $appStore.rotate.y !== 0;

  onMount(() => {
    appService = App.getAppService();
  });
</script>

<div class="lg:w-3/12 w-full self-start space-y-6">
  <Card class="border border-zinc-700 bg-zinc-950 rounded-xl">
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
      <ControlPanelRow labelIcon={ThreeDRotateIcon} label="Rotate">
        <div class="flex gap-4 items-center">
          <RotateDrawer onRotateChange={rotateChangeHandler} bind:rotateDrawerRef />
          <div>
            {#if rotateChanged}
              <button
                class="px-4 py-2 text-xs bg-zinc-800 hover:bg-zinc-700 hover:border-zinc-600 rounded-lg border border-zinc-700 flex"
                on:click={() => {
                  $appStore.rotate = { x: 0, y: 0 };
                  rotateDrawerRef.force({ x: 0, y: 0 });
                }}
              >
                <span> Reset </span>
              </button>
            {/if}
          </div>
        </div>
      </ControlPanelRow>
      <hr class="border-gray-600" />
      <!-- <ControlPanelRow labelIcon={FileStackIcon} label="Image Type">
        {#each imageTypes as type}
          <button
            class={clsx("text-white", {
              "border-b border-white": $appStore.imageType === type
            })}
            on:click={() => appService?.updateImageType(type)}
          >
            {type}
          </button>
        {/each}
      </ControlPanelRow> -->
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
            <span> Download </span>
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
  <BuyMeACoffeeBlock />
</div>
