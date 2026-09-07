const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const puppeteer = require('puppeteer'); // ✅ full Puppeteer

(async () => {
    // Use Puppeteer’s bundled Chromium
    const executablePath = puppeteer.executablePath();

    const client = new Client({
        authStrategy: new LocalAuth({ dataPath: './sessions' }),
        puppeteer: {
            executablePath,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
    });

    client.on('qr', qr => qrcode.generate(qr, { small: true }));
    client.on('ready', () => console.log('Bot is ready!'));

    // Load trigger variants dynamically from Render environment variable
    const triggerVariants = process.env.TRIGGER_VARIANTS
        ? process.env.TRIGGER_VARIANTS.split(',').map(v => v.trim().toLowerCase())
        : [];

    function containsPasteTrigger(text) {
        const lower = text.toLowerCase();
        return triggerVariants.some(trigger => lower.includes(trigger));
    }

    client.on('message', msg => {
        const text = msg.body.toLowerCase();
        if (msg.from.includes('@g.us') && containsPasteTrigger(text)) {
            msg.reply('0114412455');
        }
    });

    client.initialize();
})();
