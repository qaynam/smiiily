<script lang="ts">
  import { clsx } from 'clsx';
  import { twMerge } from 'tailwind-merge';
  import Button from '~/components/basic/Button.svelte';
  import Card from '~/components/basic/Card.svelte';
  import Stack from '~/components/basic/Stack.svelte';
  import { copyImage, domToBlob, donwloadFromBlob } from '~/lib';

  const gradients = [
    'bg-gradient-to-l from-violet-700 via-indigo-300 to-cyan-400',
    'bg-gradient-to-tl from-fuchsia-300 via-blue-300 to-red-400',
    'bg-gradient-to-l from-cyan-100 via-purple-300 to-white',
    'bg-gradient-to-br from-transparent via-orange-100 to-white',
    'bg-gradient-to-t from-cyan-600 via-cyan-400 to-indigo-100'
  ];
  const paddingObject = {
    small: 'p-5',
    medium: 'p-10',
    large: 'p-20'
  };
  const paddingKeys = Object.keys(paddingObject) as (keyof typeof paddingObject)[];

  let currentGradient = 0;
  let selectImageUrl = '';
  let padding = paddingObject.small;
  let cardRef: HTMLDivElement;

  const changeGradient = (index: number) => {
    currentGradient = index;
  };

  const imageSelectHandler = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (!target.files) {
      return;
    }

    try {
      selectImageUrl = URL.createObjectURL(target.files[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const updatePaddingHandler = (paddingKey: keyof typeof paddingObject) => {
    padding = paddingObject[paddingKey];
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
          class={clsx(
            'border border-gray-600 w-9/12 transition-all ease-in-out duration-300 min-h-[400px]',
            gradient,
            padding
          )}
        >
          {#if selectImageUrl}
            <img src={selectImageUrl} alt="" />
          {:else}
            <div class="flex items-center justify-center m-auto">
              <input type="file" placeholder="select image" on:change={imageSelectHandler} />
            </div>
          {/if}
        </Card>
        <Card class="border border-gray-600 w-3/12 self-start ">
          <Stack class="gap-6">
            <Stack class="gap-2">
              <span class="font-bold text-white">Padding</span>
              <div class="gap-2 flex flex-wrap">
                {#each paddingKeys as paddingKey}
                  <button
                    class={clsx('text-white', {
                      'border-b border-white': padding === paddingObject[paddingKey]
                    })}
                    on:click={() => updatePaddingHandler(paddingKey)}
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
                      'w-10 h-10 rounded-lg',
                      clsx({
                        'ring-2 ring-white': currentGradient === index
                      })
                    )}
                    on:click={() => changeGradient(index)}
                  />
                {/each}
              </div>
            </Stack>
            <hr class="border-gray-600" />
            <div class="flex justify-between gap-4">
              <Button class="w-full" outline on:click={copyHandler}>Copy</Button>
              <Button class="bg-blue-500 text-white w-full" on:click={saveHandler}>Save</Button>
            </div>
          </Stack>
        </Card>
      </div>
    </Stack>
  </div>
</div>
