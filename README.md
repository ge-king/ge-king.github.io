# georgeking.uk

My personal site: a static page with an animated ASCII black hole, in light and dark themes. There is no build step: everything in `public/` is served as it is.

- `public/blackhole.js` traces light rays around the black hole in WebGL 2, then draws the result as glyphs.
- `public/theme.js` is the light/dark switch. The starting theme is picked by a small script in `index.html`.
- `public/trail.js` draws a faint grey trail of glyphs behind the cursor.
- `public/index.html` holds the page text, plus a baked ASCII frame for browsers without WebGL.

```shell
npm start        # http://localhost:4173
npm run deploy   # publishes public/ to the gh-pages branch
```
