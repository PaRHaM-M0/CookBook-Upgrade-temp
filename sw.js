/* PaRHaM's CookBook! — Two-Tier Resilient Service Worker (FA + EN)
   Tier 1 (CORE_URLS): lightweight shell + all HTML/CSS/JS/icons cached atomically on install.
   Tier 2 (IMAGE_URLS): WebP photos warmed asynchronously via Promise.allSettled without blocking install. */
const CACHE_VERSION = "cookbook-v8.0.0";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const CORE_URLS = [
  "./",
  "./index.html",
  "./en/",
  "./en/index.html",
  "./manifest.json",
  "./assets/theme.css",
  "./assets/home.css",
  "./assets/recipe.css",
  "./assets/recipes.js",
  "./assets/app.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-192.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-64.png",
  "./recipes/30-minute-pub-burger.html",
  "./recipes/bellyfull-chicken-alfredo.html",
  "./recipes/cheesy-potato-thing.html",
  "./recipes/cherry-cheesecakes.html",
  "./recipes/chicken-65.html",
  "./recipes/chicken-alfredo-garlic-bread.html",
  "./recipes/chicken-mushroom-alfredo.html",
  "./recipes/classic-caesar-salad.html",
  "./recipes/detroit-style-pizza.html",
  "./recipes/deviled-egg-dip.html",
  "./recipes/easy-chicken-alfredo-penne.html",
  "./recipes/fast-food-sauce-copycat-collection.html",
  "./recipes/grand-unified-burger.html",
  "./recipes/harira.html",
  "./recipes/herb-compound-butter.html",
  "./recipes/homemade-chicken-broth.html",
  "./recipes/homemade-ricotta.html",
  "./recipes/italian-seasoning.html",
  "./recipes/lacto-fermented-pizza-sauce.html",
  "./recipes/lemon-chicken-orzo-soup.html",
  "./recipes/linguine-gamberetti-zafferano.html",
  "./recipes/low-calorie-high-protein-double-smash-cheeseburger.html",
  "./recipes/modular-burrito-encyclopedia.html",
  "./recipes/neapolitan-pizza.html",
  "./recipes/new-york-egg-cream.html",
  "./recipes/perfect-pancakes.html",
  "./recipes/pizza-toppings.html",
  "./recipes/poolish-pizza-dough.html",
  "./recipes/popeyes-style-fried-chicken-meal.html",
  "./recipes/porchetta-bacon.html",
  "./recipes/robuchon-pomme-puree.html",
  "./recipes/sausage-cheese-pinwheels.html",
  "./recipes/scialatielli-gamberi.html",
  "./recipes/sourdough.html",
  "./recipes/stuffed-crust-pizza.html",
  "./recipes/tunakado.html",
  "./recipes/yangnyeom-chicken.html",
  "./en/recipes/30-minute-pub-burger.html",
  "./en/recipes/bellyfull-chicken-alfredo.html",
  "./en/recipes/cheesy-potato-thing.html",
  "./en/recipes/cherry-cheesecakes.html",
  "./en/recipes/chicken-65.html",
  "./en/recipes/chicken-alfredo-garlic-bread.html",
  "./en/recipes/chicken-mushroom-alfredo.html",
  "./en/recipes/classic-caesar-salad.html",
  "./en/recipes/detroit-style-pizza.html",
  "./en/recipes/deviled-egg-dip.html",
  "./en/recipes/easy-chicken-alfredo-penne.html",
  "./en/recipes/fast-food-sauce-copycat-collection.html",
  "./en/recipes/grand-unified-burger.html",
  "./en/recipes/harira.html",
  "./en/recipes/herb-compound-butter.html",
  "./en/recipes/homemade-chicken-broth.html",
  "./en/recipes/homemade-ricotta.html",
  "./en/recipes/italian-seasoning.html",
  "./en/recipes/lacto-fermented-pizza-sauce.html",
  "./en/recipes/lemon-chicken-orzo-soup.html",
  "./en/recipes/linguine-gamberetti-zafferano.html",
  "./en/recipes/low-calorie-high-protein-double-smash-cheeseburger.html",
  "./en/recipes/modular-burrito-encyclopedia.html",
  "./en/recipes/neapolitan-pizza.html",
  "./en/recipes/new-york-egg-cream.html",
  "./en/recipes/perfect-pancakes.html",
  "./en/recipes/pizza-toppings.html",
  "./en/recipes/poolish-pizza-dough.html",
  "./en/recipes/popeyes-style-fried-chicken-meal.html",
  "./en/recipes/porchetta-bacon.html",
  "./en/recipes/robuchon-pomme-puree.html",
  "./en/recipes/sausage-cheese-pinwheels.html",
  "./en/recipes/scialatielli-gamberi.html",
  "./en/recipes/sourdough.html",
  "./en/recipes/stuffed-crust-pizza.html",
  "./en/recipes/tunakado.html",
  "./en/recipes/yangnyeom-chicken.html",

];

const IMAGE_URLS = [
  "./images/30-minute-pub-burger-480.webp",
  "./images/bellyfull-chicken-alfredo-480.webp",
  "./images/cheesy-potato-thing-480.webp",
  "./images/cherry-cheesecakes-480.webp",
  "./images/chicken-65-480.webp",
  "./images/chicken-alfredo-garlic-bread-480.webp",
  "./images/chicken-mushroom-alfredo-480.webp",
  "./images/classic-caesar-salad-480.webp",
  "./images/detroit-style-pizza-480.webp",
  "./images/deviled-egg-dip-480.webp",
  "./images/easy-chicken-alfredo-penne-480.webp",
  "./images/fast-food-sauce-copycat-collection-480.webp",
  "./images/grand-unified-burger-480.webp",
  "./images/harira-480.webp",
  "./images/herb-compound-butter-480.webp",
  "./images/homemade-chicken-broth-480.webp",
  "./images/homemade-ricotta-480.webp",
  "./images/italian-seasoning-480.webp",
  "./images/juicy-steakhouse-burger-480.webp",
  "./images/lacto-fermented-pizza-sauce-480.webp",
  "./images/lemon-chicken-orzo-soup-480.webp",
  "./images/linguine-gamberetti-zafferano-480.webp",
  "./images/low-calorie-high-protein-double-smash-cheeseburger-480.webp",
  "./images/modular-burrito-encyclopedia-480.webp",
  "./images/new-york-egg-cream-480.webp",
  "./images/perfect-pancakes-480.webp",
  "./images/pizza-480.webp",
  "./images/pizza-toppings-480.webp",
  "./images/poolish-pizza-dough-480.webp",
  "./images/popeyes-style-fried-chicken-meal-480.webp",
  "./images/porchetta-bacon-480.webp",
  "./images/robuchon-pomme-puree-480.webp",
  "./images/sausage-cheese-pinwheels-480.webp",
  "./images/scialatielli-gamberi-480.webp",
  "./images/sourdough-480.webp",
  "./images/stuffed-crust-pizza-480.webp",
  "./images/tunakado-480.webp",
  "./images/yangnyeom-chicken-480.webp",

];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(STATIC_CACHE);
    await cache.addAll(CORE_URLS);
    /* Warm all WebP images non-atomically in the background so a flaky network never aborts install */
    Promise.allSettled(IMAGE_URLS.map((url) => cache.add(url))).catch(() => {});
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => !key.startsWith(CACHE_VERSION)).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request, { ignoreSearch: true });
  const network = fetch(request).then((response) => {
    if (response && (response.status === 200 || response.type === "opaque")) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => null);
  return cached || (await network) || Response.error();
}

async function networkFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  try {
    const response = await fetch(request);
    if (response && response.status === 200) await cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    const fallback = request.url.includes("/en/") ? "./en/index.html" : "./index.html";
    const home = await cache.match(fallback, { ignoreSearch: true });
    if (home) return home;
    throw error;
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }
  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
    return;
  }
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
  }
});
