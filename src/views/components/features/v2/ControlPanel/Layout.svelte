<script lang="ts">
  import { onMount } from "svelte";
  import type { PointerEventHandler } from "svelte/elements";

  interface $$Props {}

  const CONTROL_PANEL_MAX_WIDTH = 450;
  const CONTROL_PANEL_MIN_WIDTH = 300;

  let isDragging: boolean = false;
  let controlPanelWidth: number =
    CONTROL_PANEL_MIN_WIDTH + (CONTROL_PANEL_MAX_WIDTH - CONTROL_PANEL_MIN_WIDTH) / 2; // middle of range value
  let controlPanelStartedXPoint: undefined | number;
  const handleMouseMove = (e: DocumentEventMap["mousemove"]) => {
    if (!controlPanelStartedXPoint) {
      return;
    }

    const currentWidth = window.innerWidth - e.pageX;

    if (currentWidth > CONTROL_PANEL_MAX_WIDTH) {
      controlPanelWidth = CONTROL_PANEL_MAX_WIDTH;
      return;
    }

    if (currentWidth < CONTROL_PANEL_MIN_WIDTH) {
      controlPanelWidth = CONTROL_PANEL_MIN_WIDTH;
      return;
    }

    controlPanelWidth = currentWidth;
  };
  const handleControlBarPointerdown: PointerEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (isDragging) {
      isDragging = false;
    }
    isDragging = true;
    controlPanelStartedXPoint = e.pageX;
    window.addEventListener("pointermove", handleMouseMove);
  };
  const handleControlBarPointerUp: PointerEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    isDragging = false;
    window.removeEventListener("pointermove", handleMouseMove);
  };
  const handleControlBarPointerCancel = (e: PointerEvent) => {
    isDragging = false;
    controlPanelStartedXPoint = e.pageX;
    window.removeEventListener("pointermove", handleMouseMove);
  };

  onMount(() => {
    window.addEventListener("pointerup", handleControlBarPointerCancel, {
      passive: true
    });
    window.addEventListener("pointercancel", handleControlBarPointerCancel, {
      passive: true
    });
    return () => {
      window.removeEventListener("pointerup", handleControlBarPointerCancel);
      window.removeEventListener("pointercancel", handleControlBarPointerCancel);
    };
  });
</script>

<div
  class="bg-zinc-900 p-4 relative h-screen overflow-y-auto"
  style:max-width={`${controlPanelWidth}px`}
>
  <div
    class="absolute left-0 top-0 bottom-0 w-1 bg-zinc-700 opacity-0 hover:opacity-100 cursor-col-resize"
    class:opacity-100={isDragging}
    on:pointerdown|preventDefault|nonpassive|stopPropagation={handleControlBarPointerdown}
    on:pointerup|preventDefault|nonpassive|stopPropagation={handleControlBarPointerUp}
    on:pointercancel|preventDefault|nonpassive|stopPropagation={handleControlBarPointerCancel}
    draggable
  />
  <slot />
</div>
