// service worker js
self.addEventListener("install", function (event) {
  console.log("Service worker installing...");
  // Add a call to skipWaiting here
  self.skipWaiting();
});
