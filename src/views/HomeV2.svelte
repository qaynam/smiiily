<script lang="ts">
  import { onMount } from "svelte";
  import type { AppService } from "~/application/services/AppService";
  import Stack from "./components/basic/Stack.svelte";
  import Header from "./components/features/Header.svelte";
  import Seo from "./components/features/Seo.svelte";
  import { App } from "~/application/main";
  import ControlPanel from "./components/features/ControlPanel/ControlPanel.svelte";
  import MainBlock from "./components/features/MainBlock.svelte";

  let appService: AppService;

  onMount(() => {
    appService = App.getAppService();
  });
</script>

<Seo />
<div class="sm:container lg:min-w-[1300px] mx-auto md:px-0 px-6">
  <Stack>
    <Header />
    <div
      class="min-w-5xl flex lg:flex-row flex-col lg:space-x-10 space-x-0 space-y-10 lg:space-y-0"
    >
      <MainBlock />
      <ControlPanel />
    </div>
  </Stack>
</div>
