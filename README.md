# කතා ලියන – Sinhala Voice Typing

Speak in Sinhala, Tamil or English and get clean text.

- **Live mode** (free): text appears while you speak. Uses Chrome's built-in Google speech engine.
- **AI accurate mode**: record, tap stop, and Gemini writes the text with correct Sinhala spelling and punctuation. Needs a free Gemini API key.
- **Write as**: get the text as spoken, as an English translation, or both (Sinhala paragraph, then English).
- **Translate button**: translates the selected text (or all text) Sinhala ↔ English. Then copy it, add it below the original, or replace the original.
- **Audio files**: tap the file button (or drag a file onto the page) to turn a voice note, MP3, M4A, WAV, OGG/OPUS or video into text. Long files (up to about an hour) are split at pauses and written part by part.
- **Share from WhatsApp (Android)**: once installed, long-press a voice note → Share → කතා ලියන. Shared text can also be sent to the app and translated.

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

## Tips

- Set **Spoken** to the language in the audio. Set **Write as** before you record or upload.
- Translation style (Natural or Formal) and your special words list are in Settings.
- Very long files use more of your free Gemini quota. If the limit is reached, the app waits and retries. If it still fails, tap **Retry** and it continues from the part where it stopped.

## Updating the app

After changing any file, open `sw.js` and change `VERSION` (for example `katha-v2` → `katha-v3`),
then upload. Phones get the new version the next time the app is opened.
