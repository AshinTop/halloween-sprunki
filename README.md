[English](README.md) · [简体中文](README.zh-CN.md) · [Español](README.es.md) · [Português (Brasil)](README.pt-BR.md) · [日本語](README.ja.md)

# Pumpkin Jam — Halloween Music Maker and Memory Game

🎃 Give the pumpkin drummer a ghostly band. Pumpkin Jam is an original browser music maker with warm drums, bubbling bass, candy-bell melodies, and moonlit voices. Pick your performers, start the loop, and discover how four small parts change the whole night.

**[Play online](https://halloween-sprunki.crazy3d.org/)** · [Explore all 12 Halloween games](https://github.com/AshinTop/halloween-games) · [⭐ Star this repository](https://github.com/AshinTop/halloween-sprunki)

README translations cover five languages. The **game interface currently supports English and Simplified Chinese only**.

![Pumpkin Jam Halloween music maker with four monster performers, sound choices, and playback controls](docs/images/gameplay.jpg)

## What makes it special

- Four musical roles—beat, bass, melody, and voice—with two original performers each.
- Three presets, three secret ensembles, and changes synchronized to the next bar.
- Mute, solo, remove, and master volume controls for exploring each part.
- Ghost Echo: five rounds of musical memory with four notes and no time pressure.
- Original SVG characters and Web Audio instruments, shareable mixes, and reduced-motion support.

## How to play

Choose a character for each role, or select a preset. Press **Start** to hear the band; browsers need this interaction before audio begins. Tap a new character to replace that role. On desktop, you can also drag a character onto its matching stage. A bass performer cannot fill the melody role.

All parts share **96 BPM, C minor, and a 16-step bar**. During playback, changes wait for the next bar boundary, so a queued performer may take a moment to join. Mute hides one part, Solo isolates it, and Remove clears its slot.

### Try Ghost Echo

Press **Listen**, remember the characters’ notes, then repeat them in order using four pads. The five rounds grow from three notes to seven. A wrong note lets you listen and retry. Opening Echo pauses the band; leaving the page pauses playback and cancels the pending listening sequence. Press Start or Listen deliberately when you return.

## Controls

| Action | Input |
| --- | --- |
| Choose a performer | Click / tap a card; desktop drag to the matching role |
| Play or pause | Playback button; **Space** outside controls and dialogs |
| Adjust parts | Performer **Mute**, **Solo**, and remove buttons |
| Change volume | Master volume slider |
| Repeat Echo notes | Four pads or **1–4**, during your turn |
| Share an arrangement | Share, then copy the displayed link |

## A little strategy

Begin with beat and bass, then add melody and voice one at a time. Use Solo to hear a part clearly, then restore the ensemble. Secret combinations are discovered while the complete matching band is playing audibly: unmute every role, turn Solo off, and let the next bar begin.

## Progress and challenge links

Arrangements, mute settings, volume, language, discoveries, and Echo achievements are stored locally. Another browser has separate records. Storage being unavailable does not stop play.

An [example mix link](https://halloween-sprunki.crazy3d.org/#mix=v1-1010-0000) restores four performer choices and mute states. Solo is not included. The recipient presses Start to listen; a link neither uploads a recording nor starts sound automatically.

## Screenshots and video

![Pumpkin Jam in a compact iframe with instrument selection and Start controls](docs/images/mobile.jpg)

Actual game screenshot from a compact browser iframe; this demonstrates the small-window layout, not a physical-phone test.

[Video player and transcript](https://halloween-sprunki.crazy3d.org/intro.html) · [Download the MP4](docs/media/intro.mp4)

The **24-second silent introduction** combines actual screenshots and captions. It is a visual tour, not continuous gameplay footage or an audio demonstration.

## Frequently asked questions

### Is this a third-party Sprunki mod?

No. Pumpkin Jam has its own characters, artwork, synthesized instruments, patterns, and code. It belongs to the same Halloween site collection.

### Why is there no sound?

Press Start, then check master volume, track mutes, device volume, and the browser’s sound permissions. Returning from a hidden page requires another Start or Listen action.

### Can I record or export a song?

This version shares an arrangement link. It does not record microphones, export WAV files, or upload performances.

## Run locally and embed

Serve the repository root over HTTP:

```sh
python3 -m http.server 4173
```

Open **http://localhost:4173/**. No build or dependencies are needed. Use HTTP: `file://` can block JavaScript modules.

Run the included Node checks:

```sh
npm test
```

Checks cover mix links, ensemble rules, musical events, Echo sequences, and the actual audio scheduler with simulated clocks, including stalled tabs and cancellation. They do not measure physical-device audio latency or replace listening tests.

```html
<iframe src="https://halloween-sprunki.crazy3d.org/?embed=1"
  title="Pumpkin Jam"
  style="display:block;width:100%;height:654px;border:0"
  allow="autoplay; fullscreen" allowfullscreen></iframe>
```

Browser layout checks covered **1160×654**, **390×794**, **390×650**, and **844×340**. Extra presets and instructions use compact dialogs. Web Audio and JavaScript modules are required. The iframe’s autoplay permission does not remove the visitor’s Start action; the game does not automatically resume sound after the page is hidden.

See [EMBEDDING.md](EMBEDDING.md) for sizing, storage, input focus, and permissions. Measure available iframe height after the host toolbar.

## More little Halloween adventures

- **[Midnight Rhythm Parade](https://halloween-rhythm-parade.crazy3d.org/)** · [Source](https://github.com/AshinTop/halloween-rhythm-parade) — Play three original songs in a four-lane rhythm game.
- **[Ghost Lanterns 3D](https://halloween-3d.crazy3d.org/)** · [Source](https://github.com/AshinTop/halloween-3d) — Light a pumpkin garden with classic Lights Out logic and soul links.
- **[Haunted Hearts](https://halloween-love-game.crazy3d.org/)** · [Source](https://github.com/AshinTop/halloween-love-game) — Help two ghosts share doors, paths, and a lantern.
- **[Trick-or-Treat TriPeaks](https://halloween-tripeaks.crazy3d.org/)** · [Source](https://github.com/AshinTop/halloween-tripeaks) — Build adjacent-rank card chains across eight rescue deals.

## Credits and support

Created for **AshinTop** and **Midnight Candy Club** with human-directed, AI-assisted design, programming, and review. Artwork and synthesized sounds are original to this project. The game needs no remote account; hosting may independently add scripts or request logs.

Enjoyed playing? **[Leave a GitHub Star](https://github.com/AshinTop/halloween-sprunki)**. For bug reports, include browser, iframe size, challenge link, and reproduction steps.
