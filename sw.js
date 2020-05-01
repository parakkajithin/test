var cacheName='ppCache';
var filesToCache=[
    '/',
    '/logo.png',
    '/app.js',
    '/index.html',
    '/jquery-3.5.0.min.js',
    '/bs/css/bootstrap.min.css',
    'bs/js/bootstrap.min.js'
];
/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        return cache.addAll(filesToCache);
      })
    );
  });
  
  self.addEventListener('fetch', function(e){
    const req=e.request;
    const url= new URL(req.url);
    if(url.origin==location.origin)
    e.respondWith(cacheFirst(req));
    else{
        e.respondWith(networkFirst(req));
    }
});

async function cacheFirst(req){
    const cashResponse=await caches.match(req);
    return cashResponse || fetch(req);
}

async function networkFirst(req){
    const cache=await caches.open('news-dynamic');
    try{
        const res=await fetch(req);
        cache.put(req,res.clone());
        return res;
    }
    catch{
        return await cache.match(req);
    }
}