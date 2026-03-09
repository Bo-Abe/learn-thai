# Browser & Device Compatibility Matrix

## Desktop Browsers

| Browser              | Version   | OS              | Status     | Notes                                      |
| -------------------- | --------- | --------------- | ---------- | ------------------------------------------ |
| Google Chrome        | 120+      | Windows / macOS / Linux | Supported | Primary development browser          |
| Mozilla Firefox      | 121+      | Windows / macOS / Linux | Supported |                                            |
| Apple Safari         | 17.2+     | macOS 14+       | Supported  | Test Web Audio API behavior                |
| Microsoft Edge       | 120+      | Windows / macOS | Supported  | Chromium-based; mirrors Chrome behavior    |
| Opera                | 106+      | Windows / macOS | Best Effort| Chromium-based; not actively tested        |
| Brave                | 1.61+     | Windows / macOS | Best Effort| Chromium-based; test with Shields enabled  |

## Mobile Browsers

| Browser              | Version   | OS / Device     | Status     | Notes                                      |
| -------------------- | --------- | --------------- | ---------- | ------------------------------------------ |
| Safari (iOS)         | 17.2+     | iOS 17+ / iPadOS 17+ | Supported | Test touch, audio autoplay policies   |
| Chrome (Android)     | 120+      | Android 12+     | Supported  | Primary mobile test target                 |
| Samsung Internet     | 23+       | Android         | Best Effort| Chromium-based                             |
| Firefox (Android)    | 121+      | Android 12+     | Best Effort| Test Gecko-specific rendering              |
| Chrome (iOS)         | 120+      | iOS 17+         | Best Effort| Uses WebKit engine on iOS                  |
| Edge (Android)       | 120+      | Android 12+     | Best Effort| Chromium-based                             |

## Reference Devices

| Device Category      | Device / Viewport          | Resolution    | Notes                           |
| -------------------- | -------------------------- | ------------- | ------------------------------- |
| Mobile (small)       | iPhone SE (3rd gen)        | 375 x 667     | Minimum supported width: 320px  |
| Mobile (standard)    | iPhone 15 / Pixel 8        | 393 x 852     | Primary mobile test target      |
| Mobile (large)       | iPhone 15 Pro Max          | 430 x 932     |                                 |
| Tablet (portrait)    | iPad Air (5th gen)         | 820 x 1180    |                                 |
| Tablet (landscape)   | iPad Air (5th gen)         | 1180 x 820    |                                 |
| Desktop (standard)   | Generic                    | 1440 x 900    | Primary desktop test target     |
| Desktop (wide)       | Generic                    | 1920 x 1080   |                                 |
| Desktop (ultra-wide) | Generic                    | 2560 x 1440   | Max supported width             |

## Feature Support Matrix

| Feature                 | Chrome 120+ | Firefox 121+ | Safari 17.2+ | Edge 120+ | iOS Safari 17+ | Chrome Android 120+ |
| ----------------------- | ----------- | ------------ | ------------ | --------- | --------------- | ------------------- |
| CSS Grid / Flexbox      | Yes         | Yes          | Yes          | Yes       | Yes             | Yes                 |
| Tailwind CSS 4          | Yes         | Yes          | Yes          | Yes       | Yes             | Yes                 |
| Framer Motion           | Yes         | Yes          | Yes          | Yes       | Yes             | Yes                 |
| Web Audio API (Howler)  | Yes         | Yes          | Yes*         | Yes       | Yes*            | Yes                 |
| Canvas 2D (writing)     | Yes         | Yes          | Yes          | Yes       | Yes             | Yes                 |
| Touch events            | N/A         | N/A          | N/A          | N/A       | Yes             | Yes                 |
| Service Worker (PWA)    | Yes         | Yes          | Yes          | Yes       | Yes*            | Yes                 |
| localStorage            | Yes         | Yes          | Yes          | Yes       | Yes             | Yes                 |
| CSS `prefers-color-scheme` | Yes      | Yes          | Yes          | Yes       | Yes             | Yes                 |
| CSS `prefers-reduced-motion` | Yes    | Yes          | Yes          | Yes       | Yes             | Yes                 |
| SVG rendering           | Yes         | Yes          | Yes          | Yes       | Yes             | Yes                 |

\* **Safari / iOS Safari notes:**
- Audio autoplay requires user gesture before first playback.
- Service Worker support available but with limitations in PWA install UX.
- Test `<audio>` and Howler.js playback behavior specifically on these browsers.

## Support Tiers

| Tier          | Definition                                                                 | Browsers                              |
| ------------- | -------------------------------------------------------------------------- | ------------------------------------- |
| **Supported** | Fully tested, bugs are fixed. Included in CI/E2E runs.                     | Chrome, Firefox, Safari, Edge, iOS Safari, Chrome Android |
| **Best Effort** | Manually tested periodically. Bugs fixed if effort is reasonable.        | Opera, Brave, Samsung Internet, Firefox Android, Chrome iOS, Edge Android |
| **Unsupported** | Not tested. Issues may be accepted as contributions but are not prioritized. | IE 11, pre-Chromium Edge, older mobile browsers |

## Testing Cadence

- **Every PR:** Playwright E2E against headless Chromium.
- **Weekly:** Manual smoke test on Firefox and Safari (desktop).
- **Before release:** Full matrix test across all Supported tier browsers and reference devices.
