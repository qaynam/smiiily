<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { ChangeEventHandler } from 'svelte/elements';

  type EventParams = {
    change: Parameters<ChangeEventHandler<HTMLInputElement>>[0];
  };

  const dispatch = createEventDispatcher<EventParams>();

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch('change', e);
  };
</script>

<input type="file" placeholder="select image" on:change={changeHandler} />
