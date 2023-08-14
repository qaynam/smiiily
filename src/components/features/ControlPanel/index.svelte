<script lang="ts">
  import { clsx } from "clsx";
  import { createEventDispatcher } from "svelte";
  import { twMerge } from "tailwind-merge";
  import {
    gradients,
    paddingKeys,
    paddingTypes,
    type PaddingType,
    roundnessKeys,
    roundnessTypes,
    type RoundnessType
  } from "~/constants";
  import Button from "../../basic/Button.svelte";
  import Card from "../../basic/Card.svelte";
  import Stack from "../../basic/Stack.svelte";
  import CopyIcon from "../../icons/CopyIcon.svelte";
  import DownloadIcon from "../../icons/DownloadIcon.svelte";
  import BoxPaddingIcon from "~/components/icons/BoxPaddingIcon.svelte";
  import RadiusTopLeftIcon from "~/components/icons/RadiusTopLeftIcon.svelte";
  import PaletteIcon from "~/components/icons/PaletteIcon.svelte";
  import ControlPanelRow from "./ControlPanelRow.svelte";
  import RotateClockWiseIcon from "~/components/icons/RotateClockWiseIcon.svelte";
  import { toastStore } from "~/stores";

  type EventParams = {
    paddingChange: {
      padding: PaddingType;
    };
    gradientChange: {
      gradientIndex: number;
    };
    roundnessChange: {
      roundness: RoundnessType;
    };
    copy: undefined;
    save: undefined;
  };

  const dispatch = createEventDispatcher<EventParams>();

  export let padding = paddingTypes.small;
  export let roundness = roundnessTypes.small;
  export let gradientIndex = 0;
  export let imageSelected = false;
  export let onCopy: () => void | Promise<void> = () => void 0;
  export let onSave: () => void | Promise<void> = () => void 0;
  export let onRemoveImage: () => void | Promise<void> = () => void 0;

  const selectPaddingHandler = (paddingType: PaddingType) => {
    dispatch("paddingChange", {
      padding: paddingType
    });
  };

  const selectGradientHandler = (gradientIndex: number) => {
    dispatch("gradientChange", {
      gradientIndex
    });
  };

  const selectRoundnessHandler = (roundnessType: RoundnessType) => {
    dispatch("roundnessChange", {
      roundness: roundnessType
    });
  };

  const copyHandler = async (event: CustomEvent<{ target: HTMLButtonElement }>) => {
    event.detail.target.disabled = true;
    await onCopy();
    event.detail.target.disabled = false;
  };

  const saveHandler = async (event: CustomEvent<{ target: HTMLButtonElement }>) => {
    event.detail.target.disabled = true;
    await onSave();
    event.detail.target.disabled = false;
  };
</script>

<Card class="border border-gray-600 w-3/12 self-start ">
  <Stack class="gap-8">
    <ControlPanelRow labelIcon={RadiusTopLeftIcon} label="Roundness">
      <div class="gap-3 flex flex-wrap">
        {#each roundnessKeys as roundnessKey}
          <button
            class={twMerge(
              clsx("text-white", {
                "border-b border-white": roundness === roundnessTypes[roundnessKey]
              })
            )}
            on:click={() => selectRoundnessHandler(roundnessKey)}
          >
            {roundnessKey.replace(/^\w/, (c) => c.toUpperCase())}
          </button>
        {/each}
      </div>
    </ControlPanelRow>
    <ControlPanelRow labelIcon={BoxPaddingIcon} label="Padding">
      <div class="gap-3 flex flex-wrap">
        {#each paddingKeys as paddingKey}
          <button
            class={clsx("text-white", {
              "border-b border-white": padding === paddingTypes[paddingKey]
            })}
            on:click={() => selectPaddingHandler(paddingKey)}
          >
            {paddingKey.replace(/^\w/, (c) => c.toUpperCase())}
          </button>
        {/each}
      </div>
    </ControlPanelRow>
    <ControlPanelRow labelIcon={PaletteIcon} label="Gradients">
      <div class="flex flex-wrap gap-3">
        {#each gradients as gradientItem, index}
          <button
            class={twMerge(
              gradientItem,
              "w-10 h-10 rounded-lg",
              clsx({
                "ring-2 ring-white": gradientIndex === index
              })
            )}
            on:click={() => selectGradientHandler(index)}
          />
        {/each}
      </div>
    </ControlPanelRow>
    <hr class="border-gray-600" />
    <div class="flex justify-between gap-4">
      <Button class="w-full" outline on:click={copyHandler}>
        <CopyIcon slot="icon" />
        <span> Copy </span>
      </Button>
      <Button class="bg-blue-600 hover:bg-blue-500 text-white w-full" on:click={saveHandler}>
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
