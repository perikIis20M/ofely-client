# Ofely Mod Updater

Run `ofely-updater.bat` from the launcher folder.

1. Choose the exact folder that contains the installed mod JAR files.
2. Choose the current Minecraft version, target Minecraft version, and loader.
3. Select **Check migration**.
4. Migrate one compatible mod or use **Migrate everything**.

Use **Update installed mods** to replace files directly in the selected folder. Use **Save updates to output folder** to leave that folder untouched and write target-version JARs to a separate folder instead.

The updater recognizes Modrinth files by SHA-1, verifies downloaded files with the hashes supplied by Modrinth, and replaces a mod only after the new download passes verification. Local files that Modrinth cannot identify are shown but never overwritten automatically.
