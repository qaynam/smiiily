<script lang="ts">
  import { clsx } from "clsx";
  import { createEventDispatcher } from "svelte";
  import { twMerge } from "tailwind-merge";
  import { gradients, paddingKeys, paddingTypes, type PaddingType } from "~/constants";
  import Button from "../../basic/Button.svelte";
  import Card from "../../basic/Card.svelte";
  import Stack from "../../basic/Stack.svelte";
  import CopyIcon from "../../icons/CopyIcon.svelte";
  import DownloadIcon from "../../icons/DownloadIcon.svelte";

  type EventParams = {
    paddingChange: {
      padding: PaddingType;
    };
    gradientChange: {
      gradientIndex: number;
    };
    copy: undefined;
    save: undefined;
  };

  const dispatch = createEventDispatcher<EventParams>();

  export let padding = paddingTypes.small;
  export let currentGradient = 0;
  export let onCopy: () => void | Promise<void> = () => void 0;
  export let onSave: () => void | Promise<void> = () => void 0;

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
  <Stack class="gap-6">
    <Stack class="gap-2">
      <span class="font-bold text-white">Padding</span>
      <div class="gap-2 flex flex-wrap">
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
    </Stack>
    <Stack class="gap-2">
      <span class="font-bold text-white">Colors</span>
      <div class="flex flex-wrap gap-4">
        {#each gradients as gradientItem, index}
          <button
            class={twMerge(
              gradientItem,
              "w-10 h-10 rounded-lg",
              clsx({
                "ring-2 ring-white": currentGradient === index
              })
            )}
            on:click={() => selectGradientHandler(index)}
          />
        {/each}
      </div>
    </Stack>
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
  </Stack>
</Card>
