<script>
  import { GA, GAActions } from "~/lib/ga";
</script>

<div
  id="bmac"
  class="border border-white bg-zinc-900 hover:bg-zinc-800/70 rounded-xl mx-auto lg:w-auto w-full items-center justify-center"
>
  <div class="flex flex-col p-4 rounded-xl space-y-6 bg-transparent backdrop-blur-xl">
    <span class="block font-semibold text-center"> If You Like This App, Buy Me A Coffee 😋 </span>
    <a
      target="_blank"
      on:click={() => {
        GA.sendEvent(
          GAActions.LINK_CLICK,
          "Buy Me A Coffee",
          "https://www.buymeacoffee.com/qaynam"
        );
      }}
      href="https://www.buymeacoffee.com/qaynam"
    >
      <img
        src="/buy-me-a-coffee.png"
        alt="buy me a coffee"
        class="w-44 mx-auto border border-gray-300/30 rounded-lg shadow hover:opacity-90 transition duration-300 ease-in-out"
      />
    </a>
  </div>
</div>

<style>
  #bmac {
    background: #02abd1;
    background-image: radial-gradient(at 66% 95%, hsl(231, 88%, 57%) 0px, transparent 50%),
      radial-gradient(at 99% 94%, hsl(64, 83%, 30%) 0px, transparent 50%),
      radial-gradient(at 25% 61%, hsl(198, 70%, 67%) 0px, transparent 50%),
      radial-gradient(at 100% 32%, hsl(285, 64%, 67%) 0px, transparent 50%),
      radial-gradient(at 68% 22%, hsl(135, 97%, 85%) 0px, transparent 50%);
  }
</style>
