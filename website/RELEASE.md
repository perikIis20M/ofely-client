# Website release

## Hosting

The existing repository is `perikIis20M/ofely-client`. GitHub Pages serves the `docs/` directory from `main`; `docs/CNAME` remains `bwrs.online`. No DNS or server configuration changes are needed. The launcher and discontinued updater sources remain separate from the website build.

## Routes

- `/` - short team and project overview
- `/projects/` - searchable, filterable catalog
- `/team/` - four core team members
- `/smps/` - inactive SMP overview
- `/rowglide/` (with `/rawglide/` redirect)
- `/quitkeybind/`
- `/improved-advancements-screen/`
- `/op-login/`
- `/combat-log-detector/`
- `/bwhitelist/`
- `/smp-essentials/`
- `/powerssmp/`
- `/bountysmp/`
- `/ofely/`
- `/ofely-mod-updater/`

Each route has its own HTML document, title, description, canonical URL, and direct-link support. GitHub Pages also has a custom 404 page, sitemap, and robots file. There are no fabricated downloads, player counters, or testimonials.

## Check and publish

1. Run `npm run build:site`.
2. Start `npm run preview:site` and run `node website/qa.cjs` with Playwright/Chrome available.
3. Review `git diff` and commit the website source and generated `docs/` output.
4. Push to the existing `main` branch and wait for its GitHub Pages deployment.
5. Check the homepage and a direct project link on `https://bwrs.online`.

## Rollback

The previous website is available at commit `cb31bd1cad2b9b934050d771b3a3802e70c7f54f`. A local ZIP of the original `docs/` was also created before edits.

To undo this release while preserving later history, revert this release's commit with `git revert <website-release-commit>`, then push. Reverting the revert reapplies it. Do not reset or force-push the branch.

To roll back just the website, restore `docs/` from the pre-release commit into a new commit and push it; retain `website/` so the redesign can be rebuilt later. Keep `docs/CNAME` intact.
