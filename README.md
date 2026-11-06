# Listen Up Testimonials

Static marketing site for Listen Up Testimonials (ListenUp). The intended domain is listenuptestimonials.com. This repository is the public site only. It is not the recording or admin application.

## Preview locally

Open `index.html` in a browser, or serve the folder with any static server:

```bash
python3 -m http.server 8080
```

Then visit http://localhost:8080

Pages:

- `index.html` — home
- `product.html` — invites, recording, consent, review, and the embed gallery
- `pricing.html` — example Starter, Growth, and Business tiers
- `contact.html` — mailto contact form (nothing is posted to a server)

Shared styles are in `css/styles.css`. `js/site.js` handles the mobile menu and builds the contact mailto link. The form still has a `mailto:` action if JavaScript is unavailable.

## Deploy

A Hostinger static deploy comes later and needs the owner's approval before anyone publishes the site. Do not deploy from this repository until that approval is in place.

## Fonts

Source Sans 3 and Source Serif 4 are self-hosted Latin subsets under the SIL Open Font License 1.1. License texts are in `assets/fonts/`.
