<script lang="ts">
  import Stack from "~/components/basic/Stack.svelte";
  import ToastSlot from "~/components/features/ToastSlot.svelte";
  import "~/styles/app.css";
</script>

<main class="min-h-[100vh] bg-slate-950 relative pt-10 flex flex-col">
  <slot />
  <footer class="mt-auto mb-6 text-center">
    <Stack>
      <span class="text-white">
        <a class="underline" target="_blank" href="https://www.buymeacoffee.com/qaynam"
          >Buy Me a Coffee 🍵</a
        >
      </span>
      <span class="text-gray-500">
        &copy; 2023 <a class="underline" href="/">Smiiily</a>
      </span>
    </Stack>
  </footer>
</main>
<ToastSlot />
