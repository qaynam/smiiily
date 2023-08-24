<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { GA, GAActions } from "~/lib/ga";

  let dragging = false;
  let circlePosition = {
    x: 0,
    y: 0
  };
  let circleRef: HTMLDivElement | null = null;
  let eventSent = false;
  export let onRotateChange: (circlePosition: { x: number; y: number }) => void = () => {};
  export let defaultPosition: { x: number; y: number } = { x: 0, y: 0 };
  export const rotateDrawerRef = {
    force: (position: { x: number; y: number }) => {
      circlePosition = position;
    }
  };

  const dragHandler = (e: PointerEvent) => {
    e.preventDefault();
    if (!dragging) return;

    if (!eventSent) {
      GA.sendEvent(GAActions.IMAGE_ROTATE, "drag");
      eventSent = true;
    }

    const currentEl = e.currentTarget as HTMLElement;
    if (!currentEl.parentElement) {
      return;
    }
    const rect = currentEl.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // 子要素の位置を取得
    const left = e.offsetX;
    const top = e.offsetY;

    const x = left < centerX ? -(centerX - left) : left - centerX;
    const y = top < centerY ? -(centerY - top) : top - centerY;

    circlePosition = {
      x: Math.round(x >= centerX ? centerX : x <= -centerX ? -centerX : x),
      y: Math.round(y >= centerY ? centerY : y <= -centerY ? -centerY : y)
    };
  };

  const mouseDownHandler = (e: PointerEvent) => {
    e.preventDefault();
    dragging = true;
    if (browser) {
      circleRef?.setPointerCapture(e.pointerId);
      circleRef?.addEventListener("pointermove", dragHandler, {
        passive: false
      });
    }
  };

  const mouseUpHandler = (e: PointerEvent) => {
    e.preventDefault();
    dragging = false;
    if (browser) {
      circleRef?.releasePointerCapture(e.pointerId);
      circleRef?.removeEventListener("pointermove", dragHandler);
    }
  };

  $: {
    onRotateChange(circlePosition);
  }

  $: {
    circlePosition = defaultPosition;
  }

  onMount(() => {
    document.addEventListener("pointerup", mouseUpHandler, {
      passive: false
    });
    return () => {
      document.removeEventListener("pointerup", mouseUpHandler);
    };
  });
</script>

<div
  class="w-[48px] h-[48px] inline-flex items-center justify-center bg-slate-800 rounded-full border border-slate-700"
>
  <div
    on:pointerdown|preventDefault|nonpassive|stopPropagation={mouseDownHandler}
    on:pointerup|preventDefault|nonpassive|stopPropagation={mouseUpHandler}
    on:pointercancel|preventDefault|nonpassive|stopPropagation={mouseUpHandler}
    bind:this={circleRef}
    class="cursor-move transition-transform duration-75 ease-linear touch-none"
    style={`transform: translate(${circlePosition.x}px,${circlePosition.y}px);`}
  >
    <svg
      class="w-[28px] h-[28px] rounded-full shadow-xl text-slate-200 block"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" />
    </svg>
  </div>
</div>
