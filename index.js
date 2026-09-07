const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth({ dataPath: './sessions' }),
    puppeteer: {
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/opt/render/.cache/puppeteer/chrome/linux-146.0.7680.31/chrome-linux64/chrome',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot is ready!');
});

// Keywords and phrases that should trigger the number reply
const pasteTriggers = [
    "paste", "mpaste", "pastini", "first", "1", "2", "3", "4", "5",
    "tupaste", "leta number", "enjoy", "kunywa soda", "kunywa"
];

// Helper: check if message contains any trigger
function containsPasteTrigger(text) {
    const lower = text.toLowerCase();
    return pasteTriggers.some(trigger => lower.includes(trigger));
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
