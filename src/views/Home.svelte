<script lang="ts">
  import Stack from "./components/basic/Stack.svelte";
  import BuyMeACoffeeBlock from "./components/features/BuyMeACoffeeBlock.svelte";
  import ControlPanel from "./components/features/ControlPanel/ControlPanel.svelte";
  import Header from "./components/features/Header.svelte";
  import MainBlock from "./components/features/MainBlock.svelte";
  import Seo from "./components/features/Seo.svelte";
</script>

<Seo />
<div class="sm:container lg:min-w-[1300px] mx-auto md:px-0 px-6">
  <Stack>
    <Header />
    <div class="min-w-5xl flex lg:flex-row flex-col lg:space-x-10 space-x-0 space-y-6 lg:space-y-0">
      <MainBlock />
      <ControlPanel />
    </div>
  </Stack>
</div>
