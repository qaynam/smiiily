<script>
  import Button from "../basic/Button.svelte";

  export let onInstallClick = () => {};
  export let onClose = () => {};
</script>

<div class="sticky lg:max-w-lg w-full mx-auto bottom-0 p-3 left-0 right-0">
  <div class="bg-white/10 p-3 backdrop-blur-lg border border-white rounded-lg">
    <div class="flex justify-between items-center gap-2 lg:text-base text-sm">
      <div class="flex gap-2">
        <button class="text-xl inline-block p-2" on:click={onClose}>&times;</button>
        <div class="flex items-center gap-2">
          <img src="/favicon.png" class="h-10 w-10" alt="" />
          <span class="font-semibold">
            Install PWA and use the app without opening your browser! !
          </span>
        </div>
      </div>
      <Button class="bg-blue-600 text-white" on:click={onInstallClick}>Install</Button>
    </div>
  </div>
</div>
