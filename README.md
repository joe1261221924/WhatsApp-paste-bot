# WhatsApp Web Bot

This bot auto-replies with personalized messages depending on:
- Whether the sender is a saved contact
- The time of day (morning, afternoon, evening)
- Keywords like "paste", "hello", and "help"

## Setup
1. Install Node.js (v16+).
2. Clone this repo.
3. Run `npm install`.
4. Start with `npm start`.
5. Scan the QR code with WhatsApp (Settings → Linked Devices).

## Deployment on Render
- Push this repo to GitHub.
- Create a new Render Web Service.
- Select Node.js environment.
- Build command: `npm install`
- Start command: `npm start`
- Enable persistent disk storage for `/data/sessions`.

## Environment Variables
- `TRIGGER_PASTE` (default: paste)
- `TRIGGER_HELLO` (default: hello)
- `TRIGGER_HELP` (default: help)

> Note: Do not commit `.env` or session files to GitHub. Manage environment variables directly in Render.
