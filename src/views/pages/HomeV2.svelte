<script lang="ts">
  import { bgPattern } from "~/constants";
  import { ControlPanel, Header, MainBlock } from "../components/features/v2";

  interface $$Props {}
</script>

<!-- header -->
<header class="bg-zinc-900 p-3 border-b border-black fixed top-0 left-0 right-0">
  <Header />
</header>

<div class="flex-grow flex">
  <!-- main -->
  <div class="flex-grow" style:background-image={`url("${bgPattern}")`}>
    <MainBlock />
  </div>
  <!-- control-panel -->
  <ControlPanel />
</div>
