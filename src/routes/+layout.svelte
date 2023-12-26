<script lang="ts">
  import "~/styles/app.css";
  import { HStack } from "~/views/components/basic";
  import PwaInstallPromptSlot from "~/views/components/features/PWAInstallPromptSlot.svelte";
  import ToastSlot from "~/views/components/features/ToastSlot.svelte";
  import { initClipboardPermission } from "~/views/components/features/modules/ClipboardPermission.svelte";
  import { initGA } from "~/views/components/features/modules/Ga.svelte";

  initClipboardPermission();
  initGA();
</script>

<main class="flex-grow bg-slate-950 relative md:pt-10 pt-6 flex flex-col gap-8 min-w-[375px]">
  <slot />
  <footer class="mt-auto mb-6 text-center">
    <HStack class="gap-6 lg:px-0 px-6">
      <span class="text-gray-500">
        &copy; 2023 <a class="underline" href="/">Smiiily</a>
      </span>
    </HStack>
  </footer>
</main>
<ToastSlot />
<PwaInstallPromptSlot />
