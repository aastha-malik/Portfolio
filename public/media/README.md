# Project media

Drop screenshots / clips / before-after images here, then reference them from
`data/content.ts` by setting the `src` (path is relative to `/public`, so a file
`public/media/tendr-dashboard.png` is `src: "/media/tendr-dashboard.png"`).

Until a `src` is set, the modal shows a labelled dashed placeholder — nothing breaks.

## What each project currently expects (all placeholders right now)

| Project              | Media in `content.ts`                                             |
| -------------------- | ---------------------------------------------------------------- |
| Klipo                | gallery: image, video, image                                     |
| Tendr                | gallery: image, image, video, image + `postUrl` (X post)         |
| Video Object Remover | `compare` (before/after) + gallery: image, video                 |
| Chikitsa Cloud       | gallery: image, image, image                                     |
| Face Fusion          | `compare` (before/after) + gallery: image, video                 |

## Examples

Gallery item:

```ts
{ kind: "image", src: "/media/tendr-dashboard.png", caption: "Dashboard" }
{ kind: "video", src: "/media/tendr-walkthrough.mp4", poster: "/media/tendr-poster.jpg", caption: "Walkthrough" }
```

Before/after compare:

```ts
compare: {
  before: "/media/vor-before.jpg",
  after:  "/media/vor-after.jpg",
  beforeLabel: "Input",
  afterLabel:  "Object removed",
}
```

- Images: PNG/JPG/WebP. Videos: MP4 (H.264) or WebM; they autoplay muted, loop, and have controls.
- `postUrl` on Tendr currently points at the X profile — swap it for a specific tweet URL when you have one.
