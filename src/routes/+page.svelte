<script lang="ts">
  import Stack from "~/components/basic/Stack.svelte";
  import ControlPanel from "~/components/features/ControlPanel/index.svelte";
  import MainBlock from "~/components/features/MainBlock/index.svelte";
  import Seo from "~/components/features/Seo.svelte";
  import { dropShadowTypes, gradients, paddingTypes, roundnessTypes } from "~/constants";
  import { copyImage, domToBlob, downloadFromBlob, isIOS } from "~/lib";
  import { toastStore } from "~/stores";

  let gradientIndex = 0;
  let selectImageUrl = "";
  let padding = paddingTypes.small;
  let roundness = roundnessTypes.small;
  let dropShadow = dropShadowTypes.small;
  let mainBlockRef: HTMLDivElement;
  let selectImageBlob: Blob | null = null;

  const changeGradientHandler = async (index: number) => {
    gradientIndex = index;
    await updateSelectImageBlob()
  };

  const updateSelectImageBlob = async () => {
    selectImageBlob = selectImageUrl ? await domToBlob(mainBlockRef) : null;
  };

  const imageSelectHandler = async (e: CustomEvent<{ file: File }>) => {
    const file = e.detail.file;
    if (!file) {
      return;
    }

    try {
      selectImageUrl = URL.createObjectURL(file);
      await updateSelectImageBlob()
    } catch (error) {
      toastStore.show("Failed to load image!", "error", 5000);
      console.error(error);
    }
  };

  const changePaddingHandler = async (paddingKey: keyof typeof paddingTypes) => {
    padding = paddingTypes[paddingKey];
    await updateSelectImageBlob();
  };

  const changeRoundnessHandler = async (roundnessKey: keyof typeof roundnessTypes) => {
    roundness = roundnessTypes[roundnessKey];
    await updateSelectImageBlob();
  };

  const changeDropShadowHandler = async (dropShadowKey: keyof typeof dropShadowTypes) => {
    dropShadow = dropShadowTypes[dropShadowKey];
    await updateSelectImageBlob();
  };

  const copyHandler = async () => {
    if (!mainBlockRef || !selectImageUrl) {
      toastStore.show("Please select an image first!", "error", 5000);
      return;
    }

    if(!selectImageBlob) {
      toastStore.show("Please wait for the image to load!", "error", 5000);
      return;
    }

    try {
      await copyImage(mainBlockRef, selectImageBlob);
      toastStore.show("Copied to clipboard!", "success", 5000);
    } catch (error) {
      toastStore.show("Failed to Copy Image!", "error", 5000);
      console.error(error);
    }
  };

  const saveHandler = async () => {
    if (!mainBlockRef) {
      return;
    }
    const blob = await domToBlob(mainBlockRef);
    downloadFromBlob(blob);
  };

  const removeImageHandler = () => {
    selectImageUrl = "";
  };

  $: gradient = gradients[gradientIndex];
</script>

<Seo/>
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
        ref={(el) => (mainBlockRef = el)}
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
