# කතා ලියන – Sinhala Voice Typing

Speak in Sinhala, Tamil or English and get clean text.

- **Live mode** (free): text appears while you speak. Uses Chrome's built-in Google speech engine.
- **AI accurate mode**: record, tap stop, and Gemini writes the text with correct Sinhala spelling and punctuation. Needs a free Gemini API key.

## Files

| File | Purpose |
|---|---|
| `index.html` | The app |
| `manifest.webmanifest` | Lets phones install it as an app (name, colours, icons) |
| `sw.js` | Service worker: fast loading and opens offline |
| `icon.svg`, `favicon.ico` | Browser tab icons |
| `icons/` | App icons for Android, iPhone and desktop |

## Put it online (GitHub Pages)

1. Create a new public repository, for example `sinhala-voice`.
2. Upload all the files, keeping the `icons` folder.
3. Go to **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
4. After a minute it is live at `https://udithapana.github.io/sinhala-voice/`.

## Install on a phone

- **Android (Chrome):** open the link, tap **Install** in the app (or ⋮ → *Install app*).
- **iPhone (Safari):** tap Share → *Add to Home Screen*. Use AI accurate mode on iPhone.

## AI mode setup

1. Get a free key at https://aistudio.google.com/apikey
2. In the app, open Settings, paste the key, tap **Save & test**.
3. In Google Cloud Console → Credentials, restrict the key to the website
   `https://udithapana.github.io/*` and to the Generative Language API.

The key is stored only in the browser on that device.

## Updating the app

After changing any file, open `sw.js` and change `VERSION` (for example `katha-v1` → `katha-v2`),
then upload. Phones get the new version the next time the app is opened.
