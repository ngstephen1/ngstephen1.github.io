# Steegle

Personal portfolio built with Next.js and Tailwind CSS.

## Local development

1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000`

## Build

- `npm run build`

The project is configured for static export via Next.js `output: "export"`.

## Troubleshooting

- If you hit a dev-only chunk error such as `Cannot find module './638.js'`, clear generated artifacts and restart:
  - `npm run dev:clean`
- You can also clean manually with:
  - `npm run clean`
- Dev and production builds now use separate output folders:
  - `next dev` writes to `.next-dev`
  - `next build` writes to `.next`

## Manual Image Replacements

These are the content images you will likely want to replace manually. Icons in `public/icons/` are part of the UI and do not need to change unless you want a new visual system.

### Core profile images

| File | Used in | Notes |
| --- | --- | --- |
| `public/head-shot.png` | Header profile avatar, About page portrait | Replace with your preferred headshot. |
| `public/signature.png` | About page decorative signature/music graphic | Replace if you want a new personal mark or illustration. |
| `public/search-img/life.jpeg` | Right-side hero image on the `life` page | Replace with the personal image you want featured there. |

### Search card image pairs

Each search result uses two files:
- `public/search-img/<alias>-icon.png`
- `public/search-img/<alias>-banner.png`

| Alias | Current site content using it | Files to replace |
| --- | --- | --- |
| `tech-connect` | Noteshell, Productivity Agent | `public/search-img/tech-connect-icon.png`, `public/search-img/tech-connect-banner.png` |
| `bumblebee` | Lovealot.Together | `public/search-img/bumblebee-icon.png`, `public/search-img/bumblebee-banner.png` |
| `winter-go` | AI Hire AI, AI Housing Agent, Marriott International | `public/search-img/winter-go-icon.png`, `public/search-img/winter-go-banner.png` |
| `renew` | AI Financial Coach, Cisco Systems, Hybrid Electric Vehicle Team | `public/search-img/renew-icon.png`, `public/search-img/renew-banner.png` |
| `torpedo` | AI Medical Research Tool | `public/search-img/torpedo-icon.png`, `public/search-img/torpedo-banner.png` |
| `muto` | Generative AI: Singing Voice Synthesis, Google DeepMind Research at Virginia Tech | `public/search-img/muto-icon.png`, `public/search-img/muto-banner.png` |
| `blu3whale` | Computational Neuroscience Lab at Virginia Tech (IMAGINE) | `public/search-img/blu3whale-icon.png`, `public/search-img/blu3whale-banner.png` |
| `rbc` | Meta-consciousness for Test Takers and Success Seekers, Growth | `public/search-img/rbc-icon.png`, `public/search-img/rbc-banner.png` |
| `speech` | Institute for Creativity, Arts, and Technology, Confidence | `public/search-img/speech-icon.png`, `public/search-img/speech-banner.png` |
| `alexa-connect` | Deloitte Data Competition | `public/search-img/alexa-connect-icon.png`, `public/search-img/alexa-connect-banner.png` |
| `meetmidway` | Interactive Music Storytelling | `public/search-img/meetmidway-icon.png`, `public/search-img/meetmidway-banner.png` |
| `dogma` | FPT Software | `public/search-img/dogma-icon.png`, `public/search-img/dogma-banner.png` |
| `spont` | Brave & Love | `public/search-img/spont-icon.png`, `public/search-img/spont-banner.png` |
| `yyz` | Chess & Life | `public/search-img/yyz-icon.png`, `public/search-img/yyz-banner.png` |

### Current recommendation

The most important replacements are:
- `public/head-shot.png`
- `public/signature.png`
- `public/search-img/life.jpeg`
- The aliases currently reused across multiple entries: `tech-connect`, `winter-go`, `renew`, `muto`, `rbc`, `speech`

If you want every project and experience card to feel custom, the cleanest next step is to give each entry its own unique `imageAlias` and matching icon/banner pair.
