<script lang="ts">
  import { onMount } from "svelte";
  import "~/styles/app.css";
  import Stack from "~/views/components/basic/Stack.svelte";
  import PwaInstallPromptSlot from "~/views/components/features/PWAInstallPromptSlot.svelte";
  import ToastSlot from "~/views/components/features/ToastSlot.svelte";

  onMount(async () => {
    const GA = (await import("$lib/ga")).GA;
    await GA.load();
  });
</script>

<main class="flex-grow bg-slate-950 relative md:pt-10 pt-6 flex flex-col gap-8 min-w-[375px]">
  <slot />
  <footer class="mt-auto mb-6 text-center">
    <Stack class="gap-2">
      <span class="text-white">
        <a class="underline" target="_blank" href="https://www.buymeacoffee.com/qaynam">
          Buy Me a Coffee
          <img src="/coffee-twemoji.png" class="h-4 w-4 inline-block ml-2" alt="" />
        </a>
      </span>
      <span class="text-gray-500">
        &copy; 2023 <a class="underline" href="/">Smiiily</a>
      </span>
    </Stack>
  </footer>
</main>
<ToastSlot />
<PwaInstallPromptSlot />
