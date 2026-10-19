# Bedwarsers

The Bedwarsers team website at [bwrs.online](https://bwrs.online), with separate pages for our mods, plugins, tools, and private SMP history. Ofely Client lives at [/ofely/](https://bwrs.online/ofely/).

- Website: `docs/`
- Website source and build tools: `website/`
- Mod updater: `updater/`
- Domain: [bwrs.online](https://bwrs.online)

The full Ofely launcher is still under development. No Microsoft tokens, Minecraft profiles, local settings, or private launcher data are included in this repository.

## Run the updater

Ofely Mod Updater is discontinued. Its existing source is retained for reference.

```bash
npm install
npm run updater
```

## Website

The static website is published from `docs/` through GitHub Pages. Its apex-domain configuration is stored in `docs/CNAME`.

The site itself has no runtime or build dependencies beyond Node.js. Published files and image assets are checked into `docs/`.

```sh
npm run build:site
npm run preview:site
```

The preview is available at `http://127.0.0.1:4178`. Edit project content, roles, statuses, and links in `website/data.mjs`; edit the layout in `website/build.mjs` and styling in `website/styles.css`. Rebuild after source changes.

Long-form guides for the six Modrinth-related projects live in `website/project-details.mjs`. They override the detail-page introductions and sections while retaining the concise catalog summaries. Sections can include paragraphs, steps, comparison or command tables, configuration examples, documented images, and notes. Their IDs drive the page's contents links. Official documentation links are included at the end of each guide; unpublished projects retain their review status.

`website/prepare-assets.cjs` is a one-time asset import utility, using Sharp and Lucide. It records the original local asset locations used for this rebuild; ordinary content changes do not require running it. Minecraft skin renders are stored locally by UUID, and member portraits come from the supplied pictures. Ofely's private Minecraft username is not published.

Browser QA can be rerun with `node website/qa.cjs` when Playwright and Chrome are installed and the preview server is running. It checks all 15 main pages at four viewport sizes, filters, navigation, image loading, reduced motion, and internal links.

See [website/DESIGN.md](website/DESIGN.md) for artwork provenance and [website/RELEASE.md](website/RELEASE.md) for publishing and rollback notes.

See [DEPLOY.md](DEPLOY.md) for the GitHub and `bwrs.online` setup steps.
