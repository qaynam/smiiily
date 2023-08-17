<script lang="ts">
  import { onMount } from "svelte";
  import { initPWA } from "~/lib/pwa";
  import InstallPrompt from "~/views/components/features/PWAInstallPrompt.svelte";

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
    deferredPrompt = e;
    showInstallPrompt = true;
  };

  const appInstalled = () => {
    // Hide the app-provided install promotion
    showInstallPrompt = false;
    // Clear the deferredPrompt so it can be garbage collected
    deferredPrompt = null;
  };

  onMount(() =>
    initPWA({
      onWindowLoad: appLoad,
      onBeforeInstallPrompt: beforeInstallPrompt,
      onAppInstalled: appInstalled
    })
  );
</script>

{#if showInstallPrompt}
  <InstallPrompt onClose={() => (showInstallPrompt = false)} onInstallClick={installHandler} />
{/if}
