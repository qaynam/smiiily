<script>
  import Button from "../basic/Button.svelte";

  export let onInstallClick = () => {};
</script>

<div class="fixed bottom-0 p-3 left-0 right-0">
  <div class="bg-white/10 p-3 backdrop-blur-lg border border-white rounded-lg">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <img src="/favicon.png" class="h-10 w-10" alt="" />
        <span class="font-semibold"> Use app without open browser ! </span>
      </div>
      <Button class="bg-blue-600 text-white" on:click={onInstallClick}>Install</Button>
    </div>
  </div>
</div>
