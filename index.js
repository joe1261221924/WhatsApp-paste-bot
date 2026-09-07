const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Environment variables for keywords
const triggerWordPaste = process.env.TRIGGER_PASTE || 'paste';
const triggerWordHello = process.env.TRIGGER_HELLO || 'hello';
const triggerWordHelp = process.env.TRIGGER_HELP || 'help';

const client = new Client({
    authStrategy: new LocalAuth({ dataPath: '/data/sessions' })
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot is ready!');
});

// Utility: random reply picker
function randomReply(replies) {
    return replies[Math.floor(Math.random() * replies.length)];
}

// Utility: time-based greeting
function timeGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning 🌞";
    else if (hour < 18) return "Good afternoon ☀️";
    else return "Good evening 🌙";
}

client.on('message', msg => {
    const text = msg.body.toLowerCase();
    const isSavedContact = msg._data.isMyContact || false;

    // Non-saved contacts → full auto-reply
    if (!isSavedContact) {
        if (text.includes(triggerWordPaste)) {
            const replies = [
                `${timeGreeting()}! Here’s the number: 0114412455 📞`,
                `Got you covered! 0114412455 ✅`,
                `Sure thing, 0114412455 🚀`
            ];
            msg.reply(randomReply(replies));
        } else if (text.includes(triggerWordHello)) {
            const replies = [
                `${timeGreeting()}! 👋`,
                `Hello there 🌞`,
                `Hi! Ready to help 🚀`
            ];
            msg.reply(randomReply(replies));
        } else if (text.includes(triggerWordHelp)) {
            msg.reply(`${timeGreeting()}! Here’s how I can assist:\n1️⃣ Contact info\n2️⃣ Quick tips\n3️⃣ Fun fact 🎉`);
        }
    }

    // Saved contacts → reply only to greetings
    else {
        if (text.includes(triggerWordHello)) {
            const replies = [
                `${timeGreeting()}! 👋`,
                `Hello there 🌞`,
                `Hi! Hope you’re doing well 🚀`
            ];
            msg.reply(randomReply(replies));
        }
    }
});

client.initialize();
