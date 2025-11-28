* PWA E‑Commerce Platform — README
 Project Overview

This project is a Progressive Web Application (PWA) built for a demo E‑Commerce platform. 
It provides:

Offline support using Service Workers & Cache API
Push Notifications using VAPID keys & Web Push API
Responsive UI for mobile and desktop
Demo shopping cart functionality

*Features
  *Features                        *Description
Offline Mode	            Works even with no internet connection
Push Notifications	      Send notifications through server endpoint
Add to Cart	              Basic shopping cart (local only)
Responsive UI             Flexible layout that adapts to screen sizes
Caching Strategy        	Pre-cache and runtime cache assets & product data


*Floder structure

pwa-ecommerce/
├── package.json
├── server.js
├── generateVapid.js
├── .env.example
└── public/
├── index.html
├── manifest.json
├── sw.js
├── app.js
├── push-subscribe.js
├── styles.css
└── assets/
├── logo.png
└── products.json
