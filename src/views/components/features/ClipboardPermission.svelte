<script lang="ts" context="module">
  import { onMount } from "svelte";
  import { requestClipboardPermission } from "~/lib/permissions";
  import { Toast } from "~/lib/toast";

  export function useClipboardPermission() {
    const documentFocusHandler = async () => {
      try {
        if (!(await requestClipboardPermission("read"))) {
          Toast.show("Clipboard permission is required to copy image feature. please ", "error");
        }
        if (!(await requestClipboardPermission("write"))) {
          Toast.show("Clipboard permission is required to copy image feature. please ", "error");
        }
      } catch (error) {
        console.error(error);
        Toast.show("Clipboard permission request failed. ", "error");
      }
    };

    onMount(() => {
      window.addEventListener("focus", documentFocusHandler);
      return () => {
        window.removeEventListener("focus", documentFocusHandler);
      };
    });
  }
</script>
