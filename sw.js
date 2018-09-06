self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('restaurant-reviews').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/restaurant.html',
          '/css/styles.css',
          '/data/restaurants.json',
          '/img/1.jpg',
          '/img/2.jpg',
          '/img/3.jpg',
          '/img/4.jpg',
          '/img/5.jpg',
          '/img/6.jpg',
          '/img/7.jpg',
          '/img/8.jpg',
          '/img/9.jpg',
          '/img/10.jpg',
          '/js/dbhelper.js',
          '/js/main.js',
          '/js/restaurant_info.js',
        ]);
      })
    );
   });

   self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response) {
          if (response){
              return response;
          }

        //Clone the response
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
            function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();
            caches.open(CACHE_NAME)
                .then(function(cache) {
                cache.put(event.request, responseToCache);
                });

                return response;
                }
            );
        })
    );   
});