<script lang="ts">
  import { onMount } from "svelte";

  const gradientColors = [
    "#0033cc",
    "#0040ff",
    "#3366ff",
    "#4d88ff",
    "#4d88ff",
    "#4d88ff",
    "#3366ff",
    "#0040ff",
    "#0033cc"
  ];
  onMount(() => {
    const squares = document.querySelectorAll<HTMLElement>(".square");

    squares.forEach((square, index) => {
      square.style.backgroundColor = gradientColors[index];
      square.style.animationDelay = `${index * 0.125}s`;
    });
  });
</script>

<div class="spinner">
  <div class="square" id="s1" />
  <div class="square" id="s2" />
  <div class="square" id="s3" />
  <div class="square" id="s4" />
  <div class="square" id="s5" />
  <div class="square" id="s6" />
  <div class="square" id="s7" />
  <div class="square" id="s8" />
  <div class="square" id="s9" />
</div>

<style scoped>
  .spinner {
    display: grid;
    grid-template-columns: repeat(3, 12px);
    grid-template-rows: repeat(3, 12px);
    grid-gap: 5px;
    justify-items: center;
    align-items: center;
  }

  .square {
    width: 12px;
    height: 12px;
    border-radius: 3px;
    box-shadow: 0 0 5px rgba(0, 0, 255, 0.5);
    animation: scaleInOut 1s infinite;
  }

  @keyframes scaleInOut {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.7);
    }
  }
</style>
