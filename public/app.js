// app.js — register service worker, load products, cart + push subscription trigger
import { initPush } from './push-subscribe.js';


// Register SW
if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('/sw.js')
.then(reg => console.log('SW registered', reg))
.catch(err => console.error('SW reg failed', err));
}


// Load products
async function loadProducts(){
const res = await fetch('/assets/products.json');
const products = await res.json();
const container = document.getElementById('products');
products.forEach(p => {
const el = document.createElement('div'); el.className='product';
el.innerHTML = `<h3>${p.name}</h3><p>${p.desc}</p><strong>₹ ${p.price}</strong><br><button data-id="${p.id}">Add</button>`;
container.appendChild(el);
});
}


const cart = [];


// Simple cart actions
document.addEventListener('click', e=>{
if (e.target.matches('button[data-id]')){
const id = Number(e.target.dataset.id);
cart.push(id);
renderCart();
}
if (e.target.id === 'checkout'){
alert('Checkout (demo) — you are offline-capable.');
}
});
function renderCart(){
const list = document.getElementById('cartItems');
list.innerHTML = '';
cart.forEach((id,i)=>{ const li = document.createElement('li'); li.textContent = `Item ${id}`; list.appendChild(li); });
}


loadProducts();


// Push
document.getElementById('enablePush').addEventListener('click', ()=>initPush());
