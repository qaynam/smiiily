<script lang="ts">
  import { tick } from "svelte";
  import Stack from "~/views/components/basic/Stack.svelte";
  import MainBlock from "~/views/components/features/MainBlock.svelte";
  import { dropShadows, gradients, paddings, roundness } from "~/constants";
  import { copyBlobToClipBoard, domToBlob, downloadFromBlob } from "~/lib/common";
  import { Toast } from "~/lib/toast";
  import { appStore } from "~/application/stores/app";
  import Seo from "./components/features/Seo.svelte";
  import { ControlPanel } from "./components/features/ControlPanel";

  let gradientIndex = 0;
  let selectImageUrl = "";
  let padding = paddings.small;
  let roundness = roundness.small;
  let dropShadow = dropShadows.small;
  let selectImageBlob: Blob | null = null;
  let imageBlogLoading = false;

  const updateSelectImageBlob = async () => {
    imageBlogLoading = true;
    await tick();
    selectImageBlob =
      selectImageUrl && $appStore.mainBlockRef ? await domToBlob($appStore.mainBlockRef) : null;
    imageBlogLoading = false;
  };

  const imageSelectHandler = async (e: CustomEvent<{ file: File }>) => {
    const file = e.detail.file;
    if (!file) {
      return;
    }

    await tick();

    try {
      selectImageUrl = URL.createObjectURL(file);
      await updateSelectImageBlob();
    } catch (error) {
      Toast.show("Failed to load image!", "error", 5000);
      console.error(error);
    }
  };

  const changePaddingHandler = async (paddingKey: keyof typeof paddings) => {
    padding = paddings[paddingKey];
    await updateSelectImageBlob();
  };

  const changeRoundnessHandler = async (roundnessKey: keyof typeof roundness) => {
    roundness = roundness[roundnessKey];
    await tick();
    await updateSelectImageBlob();
  };

  const changeDropShadowHandler = async (dropShadowKey: keyof typeof dropShadows) => {
    dropShadow = dropShadows[dropShadowKey];
    await tick();
    await updateSelectImageBlob();
  };

  const changeGradientHandler = async (index: number) => {
    gradientIndex = index;
    await tick();
    await updateSelectImageBlob();
  };

  const copyHandler = async (blob?: Blob | null) => {
    if (!$appStore.mainBlockRef || !selectImageUrl) {
      Toast.show("Please select an image first!", "error", 5000);
      return;
    }

    if (!$appStore.mainBlockDomImage || imageBlogLoading) {
      Toast.show("Please wait for the image to load!", "error", 5000);
      return;
    }

    try {
      await copyBlobToClipBoard(blob ?? $appStore.mainBlockDomImage, "image/png");
      Toast.show("Copied to clipboard!", "success", 5000);
    } catch (error) {
      Toast.show("Failed to Copy Image!", "error", 5000);
      console.error(error);
    }
  };

  const saveHandler = async () => {
    if (!$appStore.mainBlockRef) {
      return;
    }

    await updateSelectImageBlob();

    if (!selectImageBlob || imageBlogLoading) {
      Toast.show("Please wait for the image to load!", "error", 5000);
      return;
    }

    downloadFromBlob(selectImageBlob);
  };

  const removeImageHandler = () => {
    selectImageUrl = "";
  };

  $: gradient = gradients[gradientIndex];
</script>

<Seo />
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
        onPaddingChange={changePaddingHandler}
        onGradientChange={changeGradientHandler}
        onRoundnessChange={changeRoundnessHandler}
        onDropShadowChange={changeDropShadowHandler}
        onCopy={copyHandler}
        onSave={saveHandler}
        onRemoveImage={removeImageHandler}
      />
    </div>
  </Stack>
</div>
