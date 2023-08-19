<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  let dragging = false;
  let circlePosition = {
    x: 0,
    y: 0
  };
  let mouseMoveOut = false;
  export let onRotateZChange: (range: number) => void = () => {};

  const mouseMoveHandler = (e: MouseEvent) => {
    console.log(e.x, e.y);
  };

  const mouseOutHandler = (e: MouseEvent) => {
    if (dragging) {
      mouseMoveOut = true;
      if (browser) {
        document.addEventListener("mousemove", mouseMoveHandler);
      }
    }
  };

  const dragHandler = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    if (!dragging) return;
    const currentEl = e.currentTarget as HTMLElement;
    if (!currentEl.parentElement) {
      return;
    }
    const centerX = currentEl.clientWidth / 2;
    const centerY = currentEl.clientHeight / 2;

    let left = 0;
    let top = 0;

    if (e instanceof TouchEvent) {
      const rect = currentEl.getBoundingClientRect();
      left = e.targetTouches[0].clientX - rect.left;
      top = e.targetTouches[0].clientY - rect.top;
    } else {
      // 子要素の位置を取得
      left = e.offsetX;
      top = e.offsetY;
    }

    // 子要素の幅と高さの半分を取得
    const x = left <= centerX ? -(centerX - left) : left - centerX;
    const y = top <= centerY ? -(centerY - top) : top - centerY;
    circlePosition = {
      x: x >= centerX ? centerX : x <= -centerX ? -centerX : x,
      y: y >= centerY ? centerY : y <= -centerY ? -centerY : y
    };
  };

  const mouseDownHandler = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    console.log("MouseDown");
    dragging = true;
  };

  const mouseUpHandler = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    console.log("MouseUp");
    dragging = false;
    if (mouseMoveOut) {
      mouseMoveOut = false;
      if (browser) {
        document.removeEventListener("mousemove", mouseMoveHandler);
      }
    }
  };

  $: {
    onRotateZChange(circlePosition.y * 3);
  }

  onMount(() => {
    document.addEventListener("mouseup", mouseUpHandler);
    document.addEventListener("touchcancel", mouseUpHandler);
    return () => {
      document.removeEventListener("mouseup", mouseUpHandler);
      document.removeEventListener("touchcancel", mouseUpHandler);
    };
  });
</script>

<div
  class="w-[48px] h-[48px] inline-flex items-center justify-center bg-slate-800 rounded-full border border-slate-700"
>
  <div
    on:touchstart|nonpassive|stopPropagation={mouseDownHandler}
    on:touchend|nonpassive|stopPropagation={mouseUpHandler}
    on:touchmove|nonpassive|stopPropagation={dragHandler}
    on:blur={() => {
      dragging = false;
    }}
    on:mousedown={mouseDownHandler}
    on:mousemove={dragHandler}
    on:mouseout={mouseOutHandler}
    on:mouseup={mouseUpHandler}
    draggable="true"
    class="cursor-move transition-all duration-100 ease-in-out"
    style={`transform: translate(${circlePosition.x}px,${circlePosition.y}px);`}
  >
    <svg
      class="w-[24px] h-[24px] rounded-full shadow-xl text-slate-200 block"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" />
    </svg>
  </div>
</div>
