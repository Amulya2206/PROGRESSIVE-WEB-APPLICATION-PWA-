// generateVapid.js — run once to get VAPID keys
const webpush = require('web-push');
const keys = webpush.generateVAPIDKeys();
console.log('VAPID_PUBLIC=' + keys.publicKey);
console.log('VAPID_PRIVATE=' + keys.privateKey);
console.log('\nCopy these into .env or server.js');
