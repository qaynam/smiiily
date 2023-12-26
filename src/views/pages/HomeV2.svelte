<script lang="ts">
  import { ControlPanel, Header, MainBlock } from "../components/features/v2";

  interface $$Props {}
</script>

<!-- header -->
<header class="bg-zinc-900 p-3 border-b border-black">
  <Header />
</header>

<div class="flex-grow flex">
  <!-- main -->
  <div class="flex-grow bg-black">
    <MainBlock />
  </div>
  <!-- control-panel -->
  <ControlPanel />
</div>
