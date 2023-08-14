<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { ChangeEventHandler } from "svelte/elements";
  import Stack from "../basic/Stack.svelte";
  import PhotoIcon from "../icons/PhotoIcon.svelte";

  type EventParams = {
    change: Parameters<ChangeEventHandler<HTMLInputElement>>[0];
  };

  const dispatch = createEventDispatcher<EventParams>();

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch("change", e);
  };
</script>

<label
  for="image"
  class="cursor-pointer hover:bg-gray-400/40 max-w-md bg-gray-400/30 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-40 border border-gray-100 p-10"
>
  <Stack class="text-center font-normal">
    <div class="text-center">
      <PhotoIcon class="w-20 h-20  mx-auto text-white" />
    </div>
    <div class="max-w-xs text-white">
      <span> click to select image </span>
      <span> or </span>
      <span> drag and drop here </span>
      <span> or </span>
      <span> paste image from clipboard </span>
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
