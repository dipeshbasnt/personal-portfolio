# Design tokens

These draft semantic tokens are used by `app/globals.css` and exposed as Tailwind utilities.

## 1.1 Color and contrast

Contrast ratios were calculated against the two page surfaces. Normal text requires 4.5:1; interactive boundaries require 3:1. The subtle border is decorative only.

| Token | Value | Role | On canvas `#f5f2ea` | On surface `#fffefa` |
|---|---:|---|---:|---:|
| `canvas` | `#f5f2ea` | Page background | — | — |
| `surface` | `#fffefa` | Cards and form controls | — | — |
| `ink` | `#07111f` | Main text and dark surfaces | 16.93:1 | 18.76:1 |
| `muted` | `#606a73` | Secondary text | 4.93:1 | 5.47:1 |
| `accent` | `#c83a21` | Accent text and controls | 4.60:1 | 5.10:1 |
| `accent-bright` | `#f04424` | Large accent text and hero highlights | 3.38:1 | 3.74:1 |
| `accent-strong` | `#a32d19` | Accent hover state | 6.37:1 | 7.06:1 |
| `default` | `#686868` | Interactive control boundary | 4.98:1 | 5.52:1 |
| `error` | `#b42318` | Invalid form control state | 5.88:1 | 6.51:1 |
| `border-subtle` | `#dfddd5` | Decorative dividers only | 1.22:1 | 1.35:1 |

The palette follows the supplied reference direction. Replace draft values with exact Figma variables if those differ before final visual sign-off.
White text on `accent-bright` is 3.78:1 and is reserved for large bold labels; small accent text uses `accent`.

## 1.2 Type roles

| Role | Font | Usage |
|---|---|---|
| Body and hero statement | Inter | Paragraphs, buttons, and the hero statement |
| Headings and monogram | Manrope | Section headings, logo mark, and circular hero CTA |
| Navigation | Roboto | Main and mobile navigation |
| Figures | JetBrains Mono | Hero statistics |
| Display wordmark | Luckiest Guy | Large `RABBIT` hero lettering |
| Handwritten accent | Caveat | Hero signature |

Font family names and role assignments come from the supplied JSX export.
