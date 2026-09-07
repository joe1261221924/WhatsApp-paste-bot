const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth({ dataPath: './sessions' }),
    puppeteer: {
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH, // ✅ use env var only
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot is ready!');
});

// Load trigger variants from environment variable
const triggerVariants = process.env.TRIGGER_VARIANTS
    ? process.env.TRIGGER_VARIANTS.split(',').map(v => v.trim().toLowerCase())
    : [];

// Helper: check if message contains any trigger
function containsPasteTrigger(text) {
    const lower = text.toLowerCase();
    return triggerVariants.some(trigger => lower.includes(trigger));
}

client.on('message', msg => {
    const text = msg.body.toLowerCase();

    // Only reply in groups
    if (msg.from.includes('@g.us')) {
        if (containsPasteTrigger(text)) {
            msg.reply('0114412455');
        }
    }
});

client.initialize();
