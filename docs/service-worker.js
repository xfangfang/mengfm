/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

const PRECACHE = 'precache-v6';
const RUNTIME = 'runtime-v2';
var PRECACHE_URLS = [
    './',
    './index.html',
    './pc_show.html',
    './mobile_show.html',
    './data/info.json',
    './assets/js/equipment.js',
    './assets/js/flexible.js',
    './assets/js/flexible_css.js',
    './assets/js/loaders.css.js',
    './assets/js/mobilePlayer.js',
    './assets/js/pcPlayer.js',
    './assets/js/showplay.js',
    './assets/js/Utils.js',
    './assets/js/jquery-3.1.1.min.js',
    './assets/js/jquery.lazyload.min.js',
    './assets/css/pclayout-d53383e15e.css',
    './assets/css/loaders.css',
    './assets/css/main.css',
    './assets/css/normalize.css',
    './assets/css/showplay-98e61c1cde.css',
    './assets/css/index.css',
    './assets/image/logo.png',
    './assets/image/back-black-icon.png',
    './assets/image/home-black-icon.png',
    './assets/image/user-default-icon.png'
]

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  if (event.request.url.endsWith('.mp3')) return;
  if (event.request.url.endsWith('manifest.json')) return;
  if (event.request.url.indexOf('index.php') !== -1) return;
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request, {'ignoreSearch': true}).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
            try{
                return fetch(event.request).then(response => {
                // Put a copy of the response in the runtime cache.
                return cache.put(event.request, response.clone()).then(() => {
                  return response;
                });
              });
            } catch (e) {

            }
        });
      })
    );
  }
});
