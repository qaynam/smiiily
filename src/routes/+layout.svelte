<script lang="ts">
  import Stack from "~/components/basic/Stack.svelte";
  import ToastSlot from "~/components/features/ToastSlot.svelte";
  import "~/styles/app.css";
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
