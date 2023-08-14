<script lang="ts">
  import Stack from "~/components/basic/Stack.svelte";
  import ControlPanel from "~/components/features/ControlPanel/index.svelte";
  import MainBlock from "~/components/features/MainBlock/index.svelte";
  import { dropShadowTypes, gradients, paddingTypes, roundnessTypes } from "~/constants";
  import { copyImage, domToBlob, downloadFromBlob } from "~/lib";
  import { toastStore } from "~/stores";

  let gradientIndex = 0;
  let selectImageUrl = "";
  let padding = paddingTypes.small;
  let roundness = roundnessTypes.small;
  let dropShadow = dropShadowTypes.small;
  let cardRef: HTMLDivElement;

  const changeGradientHandler = (index: number) => {
    gradientIndex = index;
  };

  const imageSelectHandler = async (e: CustomEvent<{ file: File }>) => {
    const file = e.detail.file;
    if (!file) {
      return;
    }

    try {
      selectImageUrl = URL.createObjectURL(file);
    } catch (error) {
      toastStore.show("Failed to load image!", "error", 5000);
      console.error(error);
    }
  };

  const changePaddingHandler = (paddingKey: keyof typeof paddingTypes) => {
    padding = paddingTypes[paddingKey];
  };

  const changeRoundnessHandler = (roundnessKey: keyof typeof roundnessTypes) => {
    roundness = roundnessTypes[roundnessKey];
  };

  const changeDropShadowHandler = (dropShadowKey: keyof typeof dropShadowTypes) => {
    dropShadow = dropShadowTypes[dropShadowKey];
  };

  const copyHandler = async () => {
    if (!cardRef || !selectImageUrl) {
      toastStore.show("Please select an image first!", "error", 5000);
      return;
    }

    try {
      await copyImage(cardRef);
      toastStore.show("Copied to clipboard!", "success", 5000);
    } catch (error) {
      toastStore.show("Failed to Copy Image!", "error", 5000);
      console.error(error);
    }
  };

  const saveHandler = async () => {
    if (!cardRef) {
      return;
    }
    const blob = await domToBlob(cardRef);
    downloadFromBlob(blob);
  };

  const removeImageHandler = () => {
    selectImageUrl = "";
  };

  $: gradient = gradients[gradientIndex];
</script>

<svelte:head>
  <title>Smiiily - Gradient Background Image Generator for Social Media</title>
  <meta
    property="og:title"
    content="Smiiily - Gradient Background Image Generator for Social Media"
  />
  <meta
    name="description"
    content="Smiiily is a gradient background image generator for social media. You can generate gradient background images for Twitter, Facebook, Instagram, and more."
  />
</svelte:head>

<div class="sm:container lg:min-w-[1300px] mx-auto md:px-0 px-6">
  <Stack>
    <Stack class="lg:gap-2 gap-0">
      <h1 class="text-white lg:text-4xl text-3xl font-black flex items-center gap-3">
        <img src="/favicon.png" class="lg:w-10 lg:h-10 h-8 w-8" alt="Smiiily Logo" />
        Smiiily
      </h1>
      <h2 class="text-gray-400 lg:text-xl text-lg">Gradient Background Image Generator</h2>
    </Stack>
    <div
      class="min-w-5xl flex lg:flex-row flex-col lg:space-x-10 space-x-0 space-y-10 lg:space-y-0"
    >
      <MainBlock
        ref={(el) => (cardRef = el)}
        {selectImageUrl}
        {gradient}
        {padding}
        {roundness}
        {dropShadow}
        onImageChange={imageSelectHandler}
      />
      <ControlPanel
        {padding}
        {gradientIndex}
        {roundness}
        {dropShadow}
        imageSelected={!!selectImageUrl}
        on:paddingChange={({ detail: { padding } }) => changePaddingHandler(padding)}
        on:gradientChange={({ detail: { gradientIndex } }) => changeGradientHandler(gradientIndex)}
        on:roundnessChange={({ detail: { roundness } }) => changeRoundnessHandler(roundness)}
        on:dropShadowChange={({ detail: { dropShadow } }) => changeDropShadowHandler(dropShadow)}
        onCopy={copyHandler}
        onSave={saveHandler}
        onRemoveImage={removeImageHandler}
      />
    </div>
  </Stack>
</div>
