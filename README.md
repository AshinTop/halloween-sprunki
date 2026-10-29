# Halloween Music Maker — Pumpkin Jam

**Build a little monster band. Find a secret sound. Make the night your own.**

Pumpkin Jam is an original Halloween music game and browser music maker. Choose a pumpkin drummer, a bubbling bass player, a music-box melody, and a ghostly voice, then combine them into a looping arrangement. Every layer shares a 96 BPM C-minor musical palette, and changes enter together on the next bar so experimenting stays musical.

Part of **Midnight Candy Club**, created for the Halloween collection at [sprunki-game.top](https://sprunki-game.top). The characters, visuals, and browser-synthesized sounds are original to this project. This repository is **not a modified third-party Sprunki game**.

**[Play online](https://halloween-sprunki.crazy3d.org/)** · **[Watch the visual introduction](docs/media/intro.mp4)** · **[Embedding guide](EMBEDDING.md)**

**Live deployment:** Play on Cloudflare using the link above. The site is deployed from this GitHub repository. Hosting scripts and request logging may be added by Cloudflare independently of the game code.

[Video player and transcript](https://halloween-sprunki.crazy3d.org/intro.html) · [Captioned MP4 file](docs/media/intro.mp4). The 24-second silent introduction uses actual game screenshots; it is not a live gameplay recording.

![Pumpkin Jam Halloween music maker with four monster performers, instrument choices, and playback controls](docs/images/gameplay.jpg)

## Features

- **Four musical roles:** beat, bass, melody, and voice.
- **Eight original monster performers**, with two sound variations for each role.
- **Bar-synchronized changes:** a new character joins on the next 16-step bar while the band is playing.
- **Three ready-made presets** for quick starts and **three hidden ensemble combinations** to discover.
- **Per-track mute, solo, remove, and master volume** so you can hear how each part changes the arrangement.
- **Ghost Echo**, a five-round musical memory game using four notes and the same friendly characters.
- **Shareable arrangements** that restore the four character choices and mute settings from a link.
- **English and Simplified Chinese**, desktop drag-and-drop, touch-friendly selection, optional audio, and reduced-motion support.
- **Local saved progress** for arrangements, discovered ensembles, and Ghost Echo achievements.
- **No account, backend, third-party iframe, external music file, or runtime CDN dependency.**

## How to make a Halloween mix

1. Choose a performer for each of the four roles, or start with a preset.
2. Press **Start** to begin the band. The browser creates the audio only after your interaction.
3. Swap a character while the band plays. The change is queued and arrives at the next bar boundary.
4. Mute a role, solo a performer, or remove a part to hear the arrangement differently.
5. Discover hidden combinations, then share a link to your mix.

On desktop, a performer can be dragged into its matching role. On a phone, tap the character directly. A beat character belongs in the beat role, a bass character in bass, and so on.

### Ghost Echo

Open **Ghost Echo**, press Listen, and watch the characters play a short sequence. When it becomes your turn, repeat the sequence with the four note buttons. There are five rounds, beginning with three notes and growing to seven. An incorrect note lets you listen and try again.

### Controls

| Action | Input |
| --- | --- |
| Choose a character | Click or tap its card; desktop drag-and-drop is also supported |
| Start or pause the band | Playback button; **Space** when a form control or dialog is not active |
| Mute, solo, remove | The corresponding performer controls |
| Change master volume | Volume slider |
| Play Ghost Echo notes | Four on-screen pads or **1–4** |
| Share a mix | Share button, then copy the generated link |

## Share your arrangement

A link such as `#mix=v1-1010-0000` describes the arrangement and track mute states. It restores the configuration without uploading audio or starting playback for the recipient. Solo is a listening tool and is not encoded in the shared mix.

Saved arrangements and achievements stay in the current browser. The game continues to work when browser storage is blocked. It does not require sign-in or send mixes to a server.

## Audio and technical design

All instruments are synthesized with Web Audio: oscillators create drums, bass, bells, and voices, while a short generated noise buffer supplies percussion. A lookahead scheduler uses the `AudioContext` clock and an absolute musical timeline.

The scheduler skips stale events after a long browser stall instead of playing an audio backlog. Leaving the page pauses the band and cancels pending Ghost Echo activity; returning requires an explicit Start or Listen action. This behavior keeps a hidden iframe from unexpectedly resuming sound.

The musical palette is fixed at **96 BPM**, **C minor**, and **16 sixteenth-note steps per bar**. This is a compact creative instrument, rather than an audio recording workstation: it does not export WAV files, record microphones, or upload performances.

## Run locally

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173/`. The project is buildless HTML, CSS and JavaScript modules; no dependency installation or build step is needed. Use HTTP so the browser can load the modules.

```sh
npm test
```

The **12 focused tests** cover arrangement encoding and decoding, invalid share links, hidden-ensemble rules, musical event ranges, Ghost Echo checks, audio scheduling, long frozen-tab jumps, bar transitions, paused clocks, and asynchronous cancellation. The real audio class is exercised with simulated clocks. These checks do not measure actual acoustic delay or replace human listening on a physical device.

## Compact-player walkthrough

![Pumpkin Jam in a compact host iframe, with monster performers, sound choices and playback controls](docs/images/mobile.jpg)

Tap a performer to place it in the matching musical role, then press Start. Changes made during playback enter on the next bar. Compact dialogs hold extra presets and instructions so the instruments keep their space.

*Actual interface captured in a browser iframe sized for the host player. This is a compact-window illustration, not a physical-phone test.*

## Embedding

The game has a compact iframe surface and uses the iframe's own viewport. Audited host targets include **1160 × 654**, **390 × 794**, **390 × 650**, and **844 × 340** CSS pixels. The main site's toolbar should remain outside the game frame. See [EMBEDDING.md](EMBEDDING.md) for the complete host mapping and limitations.

```html
<iframe src="https://halloween-sprunki.crazy3d.org/?embed=1"
  title="Pumpkin Jam" width="1160" height="654"
  allow="autoplay; fullscreen" allowfullscreen
  style="display:block;width:100%;border:0"></iframe>
```

Use a current browser with Web Audio and ES modules. Autoplay permissions do not force playback: the visitor must still press Start. Device volume, browser audio policy, and output-device latency can affect the listening experience.

## Frequently asked questions

**Is this a Sprunki mod?**  
No. Pumpkin Jam has its own characters, artwork, synthesized instruments, and code. It is an original Halloween music maker in the same site collection.

**Why does a character say it is queued?**  
Changes join at the next bar boundary so the loop stays synchronized.

**Can I export a song?**  
You can share the arrangement as a link. Audio-file export is not part of this version.

**Why is there no sound yet?**  
Press Start, check the master volume and track mute states, and confirm your device or browser is not muted.

## Creation credits

Created for Ashin's Midnight Candy Club with AI-assisted game design, programming, documentation, testing, and review. The original monster characters, SVG visuals, musical patterns, and Web Audio instruments were developed for this project. Screenshots and the captioned visual introduction show the actual interface; audio scheduling tests do not constitute a human acoustic evaluation.

## More from Midnight Candy Club

- [Midnight Rhythm Parade](https://halloween-rhythm-parade.crazy3d.org/) · [Source](https://github.com/AshinTop/halloween-rhythm-parade) — perform three original songs in a four-lane rhythm game.
- [Ghost Lanterns 3D](https://halloween-3d.crazy3d.org/) · [Source](https://github.com/AshinTop/halloween-3d) — solve a moonlit Lights Out garden with linked-soul lanterns.
- [Haunted Hearts](https://halloween-love-game.crazy3d.org/) · [Source](https://github.com/AshinTop/halloween-love-game) — help two ghosts open doors and bring their heart home.
- [Trick-or-Treat TriPeaks](https://halloween-tripeaks.crazy3d.org/) · [Source](https://github.com/AshinTop/halloween-tripeaks) — take a thoughtful break with Halloween cards.

Enjoy making a little monster music? **[Star this repository](https://github.com/AshinTop/halloween-sprunki)** to support Pumpkin Jam and keep it close for the next creative night. Bug reports with browser details and reproducible steps are welcome.
