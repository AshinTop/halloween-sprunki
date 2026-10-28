# Embedding Pumpkin Jam

Serve this directory unchanged over HTTPS. `index.html` is the entry point; relative ES module paths work under a subdirectory. No build, external origin, API key, account, or asset CDN is required.

```html
<iframe
  src="/halloween/pumpkin-jam/index.html?embed=1"
  title="Pumpkin Jam — Halloween music game"
  allow="autoplay; clipboard-write"
  style="display:block;width:100%;height:654px;border:0"
></iframe>
```

`?embed=1` makes local standalone QA use the embedded layout. Inside an iframe this is automatic, including cross-origin embedding. Parent document access is not required. Do not block scripts with an iframe sandbox; if a sandbox is needed, the host should decide its own origin policy and allow scripts. Audio still starts only after a player click, regardless of the autoplay permission. Clipboard failure leaves a selectable link.

## Host layouts

The actual Sprunki host uses a 654 px desktop game height and a mobile viewport-sized iframe with its own 50 px toolbar. This game measures the iframe viewport, not the outer browser. Its embedded document has no page scrolling. The music stage, transport, and eight sound choices fit within the available height. On a narrow screen, the preset and hidden-combination panels move into a Sets dialog. In a short landscape viewport, the sound cards sit beside the stage, and Ghost Echo has a compact header entry. Help uses a dialog. The right edge of the header reserves room for an overlapping host exit control.

The parent QA session verified 1160×654, 390×794, 390×650, and 844×340 embedded viewports without document overflow or clipped controls. It exercised Start, queued character change, Pause, share-link creation, and Ghost Echo playback entry. This is UI verification; no human acoustic assessment has been claimed. The layout also has compact rules for smaller viewports. Dialogs may scroll internally where appropriate; the iframe document stays fixed.

## State, audio and sharing

- Start resumes a Web Audio context from a user gesture. Pause stops scheduled sources. A 25 ms lookahead task schedules note times on the audio clock; lineup changes commit at the next bar. If that task freezes, elapsed steps are skipped in constant time and the next playable step remains aligned to the original clock origin. Past notes are never replayed in a catch-up burst.
- Visibility hidden, pagehide and page freeze pause playback and invalidate pending audio/visual callbacks. A page restored from back-forward cache remains paused. Players click Start or Listen to resume deliberately. An interrupted Echo melody must be heard again.
- Sound, language, arrangements, discoveries and Echo best scores use localStorage when available. Storage failures do not prevent playing.
- A link such as `#mix=v1-1010-0000` restores the exact four sound variants and mute flags. A recipient manually starts audio. No autoplay or upload occurs.
- The embed needs no fullscreen permission. The host owns fullscreen and resizing. The interface uses CSS sizing and works when shown after being hidden.
- Honor the iframe's accessible title, and let keyboard focus enter the game. Space starts/pauses; the Echo dialog uses keys 1–4. Native buttons remain keyboard accessible.
