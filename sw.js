const CACHE="skd90-method-1.0.1";
const ASSETS=["./","index.html","styles.css","method.css","method.js","app.js","method-ui.js","manifest.json","icon.svg","mark.svg","icon-192.png","icon-512.png","mountains.png"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith("skd90-")&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",event=>{if(event.request.method!=="GET"||new URL(event.request.url).origin!==self.location.origin)return;
 event.respondWith(caches.open(CACHE).then(async cache=>{const cached=await cache.match(event.request,{ignoreSearch:true});if(cached)return cached;try{return await fetch(event.request);}catch{if(event.request.mode==="navigate")return cache.match("index.html");return Response.error();}}));
});
