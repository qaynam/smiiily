<script lang="ts">
  import { onMount } from "svelte";
  import { initPWA } from "~/lib/pwa";
  import "~/styles/app.css";
  import Stack from "~/views/components/basic/Stack.svelte";
  import InstallPrompt from "~/views/components/features/InstallPrompt.svelte";
  import ToastSlot from "~/views/components/features/ToastSlot.svelte";

  let showInstallPrompt = false;
  let deferredPrompt: BeforeInstallPromptEvent | null = null;

  const installHandler = async () => {
    // Hide the app provided install promotion
    showInstallPrompt = false;
    // Show the install prompt
    deferredPrompt?.prompt();
    // Wait for the user to respond to the prompt
    const result = await deferredPrompt?.userChoice;
    // Optionally, send analytics event with outcome of user choice
    console.log(`User response to the install prompt: ${result?.outcome}`);
    // We've used the prompt, and can't use it again, throw it away
    deferredPrompt = null;
  };

  const appLoad = () => {
    navigator.serviceWorker.register("/pwa/service-worker.js");
  };

  const beforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
    e.preventDefault();
    e.prompt();
    deferredPrompt = e;
    showInstallPrompt = true;
  };

  const appInstalled = () => {
    // Hide the app-provided install promotion
    showInstallPrompt = false;
    // Clear the deferredPrompt so it can be garbage collected
    deferredPrompt = null;
  };

  onMount(() => {
    const unsubscribe = initPWA({
      onWindowLoad: appLoad,
      onBeforeInstallPrompt: beforeInstallPrompt,
      onAppInstalled: appInstalled
    });
    return () => unsubscribe();
  });
</script>

<main class="min-h-[100vh] bg-slate-950 relative md:pt-10 pt-6 flex flex-col gap-8">
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
{#if showInstallPrompt}
  <InstallPrompt onInstallClick={installHandler} />
{/if}
