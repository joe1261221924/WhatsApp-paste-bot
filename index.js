const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const puppeteer = require('puppeteer');

(async () => {
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

    const triggerVariants = process.env.TRIGGER_VARIANTS
        ? process.env.TRIGGER_VARIANTS.split(',').map(v => v.trim().toLowerCase())
        : [];

    client.on('message', msg => {
        const text = msg.body.toLowerCase();
        if (msg.from.includes('@g.us') && triggerVariants.some(t => text.includes(t))) {
            msg.reply('0114412455');
        }
    });

    client.initialize();
})();
