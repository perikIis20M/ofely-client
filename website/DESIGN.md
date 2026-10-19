# Bedwarsers design and sources

- Direction: Minecraft-inspired, yellow/gold accents, charcoal page surfaces, an animated floating-island sky, Minecraft headings and readable sans-serif body text.
- Brand, SMP logos, and profile pictures were provided by the team.
- Four core members: Periklis20M, JohnFG, FoldarFlicker, Ofely. Theoatsa and Ploopier appear as Bounty SMP contributors only.
- Minecraft character renders: mc-heads.net, using the verified Mojang profile UUIDs. They are stored locally, not fetched by visitors.
- Project descriptions and icons: official Modrinth API, checked on 2026-10-19. The metadata used is recorded in `modrinth-sources.json`.
- Improved Advancements Screen description: supplied by the team; its icon comes from the project's source. It remains marked under review.
- Ofely Client icon and real launcher screenshot: retained from the original Ofely website. Owner: Ofely; developer: Periklis20M.
- Ofely Mod Updater: a separate, discontinued project. No individual ownership is inferred.
- Icons: Lucide, generated into a local SVG sprite by the asset preparation utility.
- Font: existing `Minecraft.ttf` retained from the original website.

## Generated background artwork

Created with the built-in image-generation tool. The scenery is illustrative website artwork, not a screenshot of either SMP. Final project assets are `docs/assets/island-scene.webp`, `island-main.webp`, and `island-sky.webp`.

### Base scene prompt

Use case: stylized-concept. Create a production website background asset, very wide landscape 16:9. A believable screenshot taken inside Minecraft Java with beautiful subtle shaders: three floating sky islands built entirely from actual Minecraft cubic blocks, pixelated grass blocks, stone andesite undersides tapering into stalactites, oak and birch trees, small wildflowers, a small wooden survival cottage with warm lanterns on the large island on the RIGHT. One small distant island at upper left, another medium island lower left, bright soft blue sky and cubic white clouds with warm late-afternoon yellow sunlight. The islands are floating high in the sky with open air below, not touching water or ground. Eye-level oblique cinematic camera, crisp block textures, realistic Minecraft lighting, gentle volumetric sunbeams, inviting nostalgic atmosphere. Composition has generous uncluttered sky through the central LEFT half for dark web typography and a large main island occupying right half. Full subject islands visible without edge cropping. This is a scene asset, not a website mockup. No writing, no letters, no logos, no watermark, no UI, no players, no smooth non-blocky rocks, no realistic round trees. Premium Minecraft screenshot, not toy clay or hand-painted illustration.

### Transparent island prompt

Use case: background-extraction. This attached generated image is the edit target. Extract ONLY the large RIGHT Minecraft floating island with cottage, trees, hanging vines and complete stone underside. Preserve exactly its appearance, textures, perspective, sunshine and silhouette. Delete all sky, clouds, sun and all other islands. True transparent background, no shadow on background, no added objects or text. Keep whole island visible including tips and leaves with a small margin. Landscape asset.

### Sky plate prompt

Use case: precise-object-edit. This generated Minecraft scene is the edit target. Remove ALL floating islands, cottage, trees, terrain and stone. Inpaint with continuous soft Minecraft shader sky and cubic clouds exactly matching the surrounding sky. Preserve the warm sun at upper right and blue skies, warm bright soft clouds below. Result is an empty, beautiful, full-bleed Minecraft sky background plate for independent island sprites to float on top of. No land, no islands, no typography or watermark. Landscape wide.

The sky plate stays stationary while separate transparent island layers gently float. Reduced-motion preferences disable their movement.

## Bed island revision

The cottage was replaced at the team's request with a large red Minecraft bed. The built-in image-generation tool edited the existing transparent island, keeping the scenery, perspective, lighting, and alpha transparency. The new asset is `docs/assets/island-bed.webp`; all three animated islands now use it.

Prompt: Edit the attached transparent Minecraft floating island asset. Replace the wooden cottage and its roof, chimney and smoke completely with one prominent red Minecraft bed with a white pillow and wooden legs, at approximately the cottage's footprint. Preserve the grass-and-stone island, pointed underside, trees, flowers, paths, fence, lanterns, shader lighting, camera perspective, and transparent background. Keep the complete island in frame. No house, sky, text, or added objects.

JohnFG's Mojang profile was verified against UUID `fdd4aec7b50a4d3c82b89338805d552e`. The original mc-heads.net render returned stale Steve imagery even though the current Minecraft texture is a blue crowned character. A verified fresh render from vzge.me is stored locally as `docs/assets/skins/john-188e2903.png`; the filename includes the start of the texture hash to avoid browser caches retaining the stale image.

The final JohnFG render is `docs/assets/skins/john-188e2903-isometric.png`. Requesting mc-heads.net by the verified texture hash instead of the profile UUID bypasses its stale profile cache and produces the same standing pose, camera angle, proportions, and lighting as the other members. The earlier alternate-provider render is no longer used.
