<script context="module" lang="ts">
  import { onMount } from "svelte";
  import { GA } from "~/lib/ga";
  export function initGA() {
    onMount(async () => {
      await GA.load();
    });
  }
</script>
