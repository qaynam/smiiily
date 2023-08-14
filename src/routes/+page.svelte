<script lang="ts">
  import { clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
  import Card from '~/components/basic/Card.svelte';
  import Stack from '~/components/basic/Stack.svelte';
  import ControlPanel from '~/components/features/ControlPanel/index.svelte';
  import ImagePicker from '~/components/features/ImagePicker.svelte';
  import { gradients, paddingTypes } from '~/constants';
  import { copyImage, domToBlob, donwloadFromBlob } from '~/lib';

  let currentGradient = 0;
  let selectImageUrl = '';
  let padding = paddingTypes.small;
  let cardRef: HTMLDivElement;

  const changeGradient = (index: number) => {
    currentGradient = index;
  };

  const imageSelectHandler = async (e: CustomEvent<Event>) => {
    const target = e.detail.target as HTMLInputElement;
    if (!target.files) {
      return;
    }

    try {
      selectImageUrl = URL.createObjectURL(target.files[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const updatePaddingHandler = (paddingKey: keyof typeof paddingTypes) => {
    padding = paddingTypes[paddingKey];
  };

  const copyHandler = async () => {
    if (!cardRef) {
      return;
    }

    try {
      await copyImage(cardRef);
      alert('Copied!');
    } catch (error) {
      console.error(error);
    }
  };

  const saveHandler = async () => {
    if (!cardRef) {
      return;
    }
    const blob = await domToBlob(cardRef);
    donwloadFromBlob(blob);
  };

  $: gradient = gradients[currentGradient];
</script>

<div class="min-h-[100vh] min-w-[100vw] bg-slate-950 flex items-center justify-center relative">
  <div class="sm:container min-w-[1300px]">
    <Stack>
      <div class="">
        <h1 class="text-white text-5xl font-black">Smiiily</h1>
        <h2 class="text-white text-xl">Gradient Image Generator</h2>
      </div>
      <div class="min-w-5xl space-x-10 flex">
        <Card
          ref={(el) => (cardRef = el)}
          class={twMerge(
            clsx(
              'border border-gray-600 w-9/12 transition-all ease-in-out duration-300 min-h-[400px]',
              gradient,
              padding
            )
          )}
        >
          {#if selectImageUrl}
            <img src={selectImageUrl} class="m-auto" alt="" />
          {:else}
            <div class="flex items-center justify-center m-auto">
              <ImagePicker on:change={imageSelectHandler} />
            </div>
          {/if}
        </Card>
        <ControlPanel
          {padding}
          on:paddingChange={({ detail: { padding } }) => updatePaddingHandler(padding)}
          on:gradientChange={({ detail: { index } }) => changeGradient(index)}
          on:copy={copyHandler}
          on:save={saveHandler}
        />
      </div>
    </Stack>
  </div>
</div>
