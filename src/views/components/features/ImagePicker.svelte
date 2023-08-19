<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { ChangeEventHandler } from "svelte/elements";
  import Stack from "../basic/Stack.svelte";
  import PhotoIcon from "../icons/PhotoIcon.svelte";
  import { clsx } from "clsx";
  import { twMerge } from "tailwind-merge";
  import ArrowBarToDown from "../icons/ArrowBarToDown.svelte";
  import { GA, GAActions } from "~/lib/ga";
  import { isFileSizeOver, isImageFile } from "~/lib/utils";
  import { Toast } from "~/lib/toast";

  let imagePickerRef: HTMLLabelElement;
  let dragOver = false;
  export let onImageSelected: ({ file }: { file: File }) => void | Promise<void> = () => void 0;
  export let style: string = "";
  export let id: string = "";
  export let maxImageSize = 1024 * 1024 * 3; // 3MB

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const currentTarget = e.currentTarget;
    const files = currentTarget?.files;
    if (files && files.length && files[0]) {
      const file = files[0];
      if (!isImageFile(file)) {
        Toast.show("Invalid file type", "error");
        return;
      }

      if (isFileSizeOver(file, maxImageSize)) {
        Toast.show("File size is too large", "error");
        return;
      }

      onImageSelected({
        file: file
      });
    }
  };

  const pasteHandler = (e: ClipboardEvent) => {
    if (e.target && e.clipboardData) {
      const items = e.clipboardData.items;
      if (items.length === 0) {
        return;
      }

      const item = items[0];
      if (item.kind !== "file") {
        return;
      }

      const file = item.getAsFile();
      if (!file) {
        return;
      }

      if (!isImageFile(file)) {
        Toast.show("Invalid file type", "error");
        return;
      }

      if (isFileSizeOver(file, maxImageSize)) {
        Toast.show("File size is too large", "error");
        return;
      }

      onImageSelected({
        file
      });

      GA.sendEvent(GAActions.IMAGE_PASTE, JSON.stringify({ file }));
    }
  };

  const dragOverHandler = (e: DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!dragOver) {
      dragOver = true;
    }
  };

  const dragleaveHandler = (e: DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    dragOver = false;
  };

  const dropHandler = (e: DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
    dragOver = false;
    if (e.dataTransfer && e.dataTransfer.files) {
      const file = e.dataTransfer.files[0];
      if (!isImageFile(file)) {
        Toast.show("Invalid file type", "error");
        return;
      }

      if (isFileSizeOver(file, maxImageSize)) {
        Toast.show("File size is too large", "error");
        return;
      }

      if (file) {
        onImageSelected({
          file
        });
      }
      GA.sendEvent(GAActions.IMAGE_DROP, JSON.stringify({ file }));
    }
  };

  onMount(() => {
    window.addEventListener("paste", pasteHandler);
    imagePickerRef.addEventListener("dragover", dragOverHandler, false);
    imagePickerRef.addEventListener("dragleave", dragleaveHandler, false);
    imagePickerRef.addEventListener("drop", dropHandler, false);
    return () => {
      window.removeEventListener("paste", pasteHandler);
      imagePickerRef.removeEventListener("dragover", dragOverHandler, false);
      imagePickerRef.removeEventListener("dragleave", dragleaveHandler, false);
      imagePickerRef.removeEventListener("drop", dropHandler, false);
    };
  });
</script>

<label
  bind:this={imagePickerRef}
  {id}
  {style}
  for="image"
  class={twMerge(
    clsx(
      "cursor-pointer hover:bg-gray-400/40 md:min-w-[30rem] bg-gray-400/30 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-40 ring ring-gray-100 md:p-10 p-6",
      {
        "ring ring-gray-600": dragOver
      }
    )
  )}
>
  <Stack class="text-center font-normal pointer-events-none">
    <div class="text-center">
      {#if dragOver}
        <ArrowBarToDown class="w-20 h-20 mx-auto text-gray-600" />
      {:else}
        <PhotoIcon class="w-20 h-20  mx-auto text-white" />
      {/if}
    </div>
    <div
      class={clsx("max-w-xs text-white mx-auto", {
        "text-gray-600": dragOver
      })}
    >
      {#if !dragOver}
        <span> click to select image </span>
        <span> or </span>
        <span> drag and drop here </span>
        <span> or </span>
        <span> paste image from clipboard </span>
      {:else}
        <span> drop image </span>
      {/if}
    </div>
  </Stack>
</label>
<input
  type="file"
  id="image"
  hidden
  accept="image/*"
  placeholder="select image"
  on:change={changeHandler}
/>
