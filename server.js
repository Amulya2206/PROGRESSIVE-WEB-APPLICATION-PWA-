// Simple Node/Express server to serve static files and send push notifications
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const path = require('path');


const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 3000;


const VAPID_PUBLIC = process.env.VAPID_PUBLIC || 'REPLACE_PUBLIC';
const VAPID_PRIVATE = process.env.VAPID_PRIVATE || 'REPLACE_PRIVATE';
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || 'mailto:example@example.com';


webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC, VAPID_PRIVATE);


// In-memory store for demo subscriptions (use DB in production)
const subscriptions = [];


app.post('/subscribe', (req, res) => {
const subscription = req.body.subscription;
if (!subscription) return res.status(400).json({ error: 'No subscription' });
subscriptions.push(subscription);
res.json({ success: true });
});


// Send a test notification to all saved subscriptions
app.post('/send-notification', async (req, res) => {
const payload = JSON.stringify({
title: req.body.title || 'Demo Notification',
body: req.body.body || 'This is a test push from server',
url: req.body.url || '/'
});


const results = [];
for (const sub of subscriptions) {
try {
await webpush.sendNotification(sub, payload);
results.push({ ok: true });
} catch (err) {
results.push({ ok: false, error: err.message });
}
}
res.json({ results });
});


app.get('/vapidPublicKey', (req, res) => {
res.send(VAPID_PUBLIC);
});


app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});
