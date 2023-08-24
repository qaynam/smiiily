<script>
  import { dev } from "$app/environment";
  const analyticsSource = dev
    ? "https://cdn.vercel-insights.com/v1/script.debug.js"
    : "/_vercel/insights/script.js";
</script>

<svelte:head>
  <title>Smiiily - Gradient Background Image Generator for Social Media</title>
  <meta
    property="og:title"
    content="Smiiily - Gradient Background Image Generator for Social Media"
  />
  <meta
    name="description"
    content="Smiiily is a gradient background image generator for social media. You can generate gradient background images for Twitter, Facebook, Instagram, and more."
  />
  <!-- twitter card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@SmiiilyApp" />
  <meta
    name="twitter:title"
    content="Smiiily - Gradient Background Image Generator for Social Media"
  />
  <meta
    name="twitter:description"
    content="Smiiily is a gradient background image generator for social media. You can generate gradient background images for Twitter, Facebook, Instagram, and more."
  />
  <meta name="twitter:creator" content="@SmiiilyApp" />
  <meta name="twitter:image" content="https://smiiily.app/og-image.png" />
  <!-- open graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://smiiily.app/" />
  <meta
    property="og:title"
    content="Smiiily - Gradient Background Image Generator for Social Media"
  />
  <meta
    property="og:description"
    content="Smiiily is a gradient background image generator for social media. You can generate gradient background images for Twitter, Facebook, Instagram, and more."
  />
  <meta property="og:image" content="https://smiiily.app/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <script defer src={analyticsSource}></script>
</svelte:head>
