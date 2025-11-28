// push-subscribe.js — handles subscription flow
export async function initPush(){
if (!('serviceWorker' in navigator)) return alert('Service Worker not supported');
if (!('PushManager' in window)) return alert('Push not supported in this browser');


try {
const reg = await navigator.serviceWorker.ready;
// Get vapid public key from server
const res = await fetch('/vapidPublicKey');
const vapidPublicKey = await res.text();


// Convert base64 to Uint8Array
function urlBase64ToUint8Array(base64String) {
const padding = '='.repeat((4 - base64String.length % 4) % 4);
const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
const rawData = window.atob(base64);
const outputArray = new Uint8Array(rawData.length);
for (let i = 0; i < rawData.length; ++i) {
outputArray[i] = rawData.charCodeAt(i);
}
return outputArray;
}


const sub = await reg.pushManager.subscribe({
userVisibleOnly: true,
applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
});


// Send subscription to server
await fetch('/subscribe', {
method: 'POST', headers: {'Content-Type':'application/json'},
body: JSON.stringify({ subscription: sub })
});


alert('Push enabled!');
} catch (err) {
console.error(err);
alert('Push subscription failed: ' + err.message);
}
}
