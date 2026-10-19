// Long-form project pages. Catalog and homepage summaries remain in data.mjs.
export const projectDetails = {
  rowglide: {
    intro: 'RowGlide adds drag-and-drop ordering to two familiar Minecraft screens: your multiplayer server list and your resource-pack selection. It is a client-side Fabric mod built around moving the row itself, so putting a favorite server at the top or changing pack priority feels like one direct action.',
    facts: [['Runs on', 'Your client'], ['Mod loader', 'Fabric'], ['Lists', 'Servers & packs'], ['License', 'MIT']],
    sections: [
      {
        id: 'server-order', title: 'Your multiplayer list, in your order.',
        text: 'Click and hold the text area of a server row, move it up or down, and release it where you want it. The server box follows the pointer vertically while staying inside the list, so you can see the position you are choosing.',
        paragraphs: ['The new server order is written to Minecraft\'s servers.dat when the drop is committed. Long lists auto-scroll when you drag near their top or bottom edge, letting you move a row farther than the currently visible entries.'],
      },
      {
        id: 'pack-priority', title: 'Selected packs, sorted your way.',
        text: 'Resource-pack priority is controlled by the order of the Selected list. RowGlide lets you change that order by dragging the pack\'s text area, rather than repeatedly using the usual arrow controls.',
        paragraphs: ['You can also drag a pack between the Available and Selected columns. A destination gap shows where the drop will go, and the change is committed when you release the mouse.'],
        table: {caption: 'What can move?', headers: ['List', 'RowGlide behavior'], rows: [['Multiplayer servers', 'Drag rows to reorder your saved servers.'], ['Selected resource packs', 'Drag rows to change pack priority.'], ['Between pack columns', 'Transfer a pack into or out of Selected.'], ['Available resource packs', 'Normal Minecraft ordering is retained.'], ['Singleplayer worlds', 'Normal Minecraft behavior; worlds are not draggable.']]},
      },
      {
        id: 'familiar-controls', title: 'The familiar controls stay familiar.',
        text: 'Dragging starts from a row\'s text area. The icon area keeps its ordinary join, enable, disable, and arrow actions, so the new interaction sits alongside the controls you already know.',
        paragraphs: ['The Available resource-pack column is deliberately not a freely reorderable list. A pack dropped back there returns to its normal Minecraft position. Dragging is also disabled while the resource-pack search box is filtering results, keeping the visible filtered list separate from the underlying order.'],
      },
      {
        id: 'start-dragging', title: 'Start with the right Fabric profile.',
        text: 'Install the RowGlide file for your Minecraft version in the mods folder of your Fabric client. It does not need to be installed on the server you join.',
        steps: [{title: 'Choose a matching release.', text: 'Published Minecraft versions include 1.21.11, 26.1, 26.1.1, 26.1.2, 26.2, and 26.3. Use the release matching your instance.'}, {title: 'Open a supported list.', text: 'Go to Multiplayer, or open Minecraft\'s resource-pack selection screen.'}, {title: 'Drag the text, then release.', text: 'Hold a row by its text area, move it to the new position, and release the mouse to commit the change.'}],
        note: 'The project README specifies Fabric Loader 0.19.3 or newer, and 0.19.5 or newer for Minecraft 26.3. The Modrinth Versions tab is the place to check individual release details.',
      },
    ],
    sources: [['Modrinth description & releases', 'https://modrinth.com/mod/rowglide']],
  },
  quitkeybind: {
    intro: 'QuitKeybind gives leaving a Minecraft world a dedicated key. Instead of opening the pause menu and choosing the disconnect button, press your chosen key to use Minecraft\'s normal exit process. It works for multiplayer servers and singleplayer worlds, with the mod installed on your client.',
    facts: [['Default key', 'F8'], ['Runs on', 'Your client'], ['Mod loader', 'Fabric'], ['License', 'MIT']],
    shortcut: {key: 'F8', title: 'One key to leave your world.', description: 'The default binding. Change it to a key that fits your setup.', path: 'Options > Controls > Key Binds > QuitKeybind'},
    sections: [
      {
        id: 'native-exit', title: 'A shortcut to Minecraft\'s own exit.',
        text: 'The keybind runs Minecraft\'s native disconnect flow. It is a shortcut to leaving the world, rather than a separate way of handling world saves or server disconnections.',
        table: {caption: 'The same key, two familiar exits', headers: ['Where you are playing', 'What the key does'], rows: [['Multiplayer', 'Disconnects you from the current server through the native client flow.'], ['Singleplayer', 'Leaves the world through Minecraft\'s normal save-and-exit flow.']]},
        paragraphs: ['The Minecraft application stays open. The key is for leaving the current server or world; it is not an operating-system shortcut to force-close the game.'],
      },
      {
        id: 'choose-key', title: 'Make the key yours.',
        text: 'F8 is assigned by default, but the binding lives in Minecraft\'s Controls menu. If that key is already used by your setup, choose another one in the QuitKeybind entry.',
        steps: [{title: 'Open Key Binds.', text: 'In Minecraft, open Options, then Controls, then Key Binds.'}, {title: 'Find QuitKeybind.', text: 'Select its binding and assign the key you want to use.'}, {title: 'Use it in a world.', text: 'While connected to a server or playing a singleplayer world, press the assigned key to leave.'}],
      },
      {
        id: 'client-setup', title: 'Install it where you play.',
        text: 'QuitKeybind is fully client-side. The server does not need it, and it works in Fabric instances created through the Modrinth App as well as other Fabric client installations.',
        paragraphs: ['Download the file matching your Minecraft version and place it in that client instance\'s mods folder. Use the release instructions for its dependencies rather than mixing files intended for different Minecraft versions.'],
        bullets: ['Published files cover Minecraft 1.21.11 and the 26.1, 26.1.1, 26.1.2, 26.2, and 26.3 releases.', 'The project supports Mod Menu, where it appears with its name, icon, and project information.', 'It is a Fabric client mod, not a plugin for a server\'s plugins folder.'],
      },
      {
        id: 'when-to-use', title: 'Keep a quick exit within reach.',
        text: 'The mod focuses on one small action: leaving the current world with a key you choose. The published feature list includes configurable keybinding, native disconnect handling, Mod Menu support, and Modrinth App compatibility.',
        paragraphs: ['For the current file, supported game version, and release requirements, use the official Modrinth listing. Periklis20M and JohnFG develop and test the project together.'],
      },
    ],
    sources: [['Modrinth description & releases', 'https://modrinth.com/mod/quitkeybind']],
  },
  'improved-advancements-screen': {
    intro: 'Improved Advancements Screen makes Minecraft\'s advancement journey easier to follow. It adds visible progress, clearer remaining requirements, stable layouts, and remembered positions, with an optional classic achievements-style map for players who prefer a different view of their goals.',
    facts: [['Runs on', 'Your client'], ['Target version', 'Fabric 26.3'], ['Views', 'Modern & classic'], ['Release', 'Under review']],
    sections: [
      {
        id: 'progress', title: 'Know what you have left to do.',
        text: 'Advancement tooltips can show completed and remaining requirements, while counts and percentages help you see progress across the selected tab. That gives you more context than a completed or incomplete icon alone.',
        paragraphs: ['These details depend on the information Minecraft receives from the server. The mod cannot reveal requirement information that the server has not sent, and Minecraft still decides when an advancement is awarded.'],
      },
      {
        id: 'views', title: 'Two ways to follow the same journey.',
        text: 'Keep the modern advancement presentation, or enable the optional Old screen inspired by Minecraft\'s pre-1.12 achievement map.',
        table: {caption: 'Choose your advancement view', headers: ['Modern view', 'Optional Old screen'], rows: [['Stable advancement layouts.', 'One draggable achievement-style map.'], ['Remembered tab and map positions.', 'An underground background with prerequisite arrows.'], ['Progress counts and percentages.', 'Gradual discovery as you explore the map.'], ['Advancement requirement details where available.', 'Optional progress details in the Old screen tooltips.']]},
        note: 'The classic map changes how progress is presented. Its connections do not replace Minecraft\'s advancement requirements or change how the server awards them.',
      },
      {
        id: 'search', title: 'Find a goal and return to it.',
        text: 'Search by advancement name, description, or item in either view. Open Search or press Ctrl+F, choose a result, and locate it on the map.',
        paragraphs: ['Remembered tabs and map positions help keep your place between visits. Together with stable layouts, this lets you return to the part of the advancement tree you were working through rather than starting from the same view each time.'],
      },
      {
        id: 'setup', title: 'Configuration and the classic screen.',
        text: 'The current project targets a Fabric 26.3 client with Fabric API. Mod Menu and Cloth Config provide access to its configuration.',
        steps: [{title: 'Use the matching client setup.', text: 'The documented build targets Minecraft 26.3 with Fabric and Fabric API.'}, {title: 'Open the mod configuration.', text: 'With Mod Menu and Cloth Config installed, open Mods > Improved Advancements Screen > Configure.'}, {title: 'Choose the screen.', text: 'Use the Screen setting to enable the optional Old screen.'}],
      },
      {
        id: 'development', title: 'A new project, still in review.',
        text: 'The Modrinth submission is under review, so there is no public Modrinth download yet. Its README and source repository document the current features and development build.',
        paragraphs: ['The project is based on Better Advancements by way2muchnoise, with work by Periklis20M and JohnFG. The upstream non-commercial license is retained, and original Minecraft artwork belongs to Mojang.'],
      },
    ],
    sources: [['Project README & source', 'https://github.com/perikIis20M/improved-advancements-screen']],
    links: [['View source', 'https://github.com/perikIis20M/improved-advancements-screen']],
  },
  'op-login': {
    intro: 'Op Login separates playing as an operator from using operator privileges. An operator joins in a locked state, authenticates when administrative access is needed, and can return to a protected state without leaving the server. The plugin adds authentication, session controls, and command auditing around that workflow.',
    facts: [['Installed on', 'The server'], ['Authentication', 'Password or PIN'], ['Session control', 'Manual & timed'], ['License', 'MIT']],
    sections: [
      {
        id: 'session-flow', title: 'Join locked. Unlock when needed.',
        text: 'Operators begin in a locked session, so administrative privileges are unavailable until authentication succeeds. They can still use the commands the server allows while locked.',
        steps: [{title: 'Join in the protected state.', text: 'Operator privileges are locked on join, while normal gameplay remains available.'}, {title: 'Authenticate for admin access.', text: 'Use /oplogin to start the configured password or PIN flow.'}, {title: 'Lock access again.', text: 'Use /oplogout, allow an unlock timeout to expire, or apply the configured automatic locking behavior.'}],
        paragraphs: ['Sensitive command protection takes priority over whitelist mistakes for high-risk commands. Administrators can also enable automatic locking after sensitive operations and use an emergency lockdown to lock online operators together.'],
      },
      {
        id: 'authentication', title: 'Password mode or a PIN keypad.',
        text: 'Password mode is the default. The /oplogin command starts authentication, and the next chat message is captured privately as the password. The optional PIN mode uses an in-game keypad with randomized digit positions and custom number heads.',
        table: {caption: 'Authentication options', headers: ['Mode', 'How it works'], rows: [['Password', 'Uses the privately captured next chat message and the configured minimum password length.'], ['PIN', 'Uses a randomized keypad. Stored credentials must be numeric and match the configured PIN length.']]},
        image: {src: 'op-login-pin.png', alt: 'Op Login PIN keypad shown in the official project documentation', caption: 'The PIN keypad, from the official Op Login documentation. Number-head textures are provided by minecraft-heads.com.'},
        note: 'Changing between password and PIN modes resets stored operator credentials and trusted-IP entries on the next startup or /opreload. This is the documented mode-change behavior.',
      },
      {
        id: 'session-controls', title: 'Control how long a session stays unlocked.',
        text: 'Unlock timeouts limit the duration of an authenticated session. Failed login attempts are tracked and can lead to temporary blocking, while operator command auditing records administrative activity.',
        paragraphs: ['Credentials are stored using BCrypt, with migration support for older AES-encrypted entries. Trusted-IP auto-login is available, but the IP is remembered only after a successful authenticated login. Using /oplogout locks the session and clears that operator\'s remembered trusted-IP state.'],
      },
      {
        id: 'commands', title: 'The operator command reference.',
        text: 'Session commands are used in game. Credential management, reload, and emergency lockdown commands are documented as console-only.',
        table: {caption: 'Commands and their purpose', headers: ['Command', 'Where', 'Action'], codeColumn: 0, rows: [['/oplogin', 'In game', 'Start password authentication or open the PIN keypad.'], ['/oplogout', 'In game', 'Lock the session and clear trusted-IP login state.'], ['/opsetpass <player> <password>', 'Console', 'Set or replace an operator credential.'], ['/resetop <player>', 'Console', 'Remove an operator credential.'], ['/opreload', 'Console', 'Reload configuration and whitelist data.'], ['/oplockdown', 'Console', 'Force online operators back into a locked state.']]},
      },
      {
        id: 'installation', title: 'Install and configure on your server.',
        text: 'Download the plugin release that matches your server, place its JAR in plugins, and start the server once to generate config.yml and whitelist.yml. Configure the settings before using the authentication workflow.',
        paragraphs: ['config.yml holds the authentication mode, minimum password length, attempt limit, temporary block duration, unlock duration, trusted-IP option, and join-locking behavior. whitelist.yml lists commands that remain available while locked, except for sensitive commands that are always protected.'],
        note: 'The project description documents Paper 1.21.x and Java 21. Modrinth also lists Bukkit, Paper, Purpur, and Spigot releases across 1.20 and 1.21 versions; select the actual file for your server rather than assuming every file supports every listed version.',
      },
    ],
    sources: [['Modrinth documentation & releases', 'https://modrinth.com/plugin/op-login'], ['Source & issue tracker', 'https://github.com/perikIis20M/OpLogin']],
  },
  'combat-log-detector': {
    intro: 'Combat Log Detector helps administrators see when someone leaves during PvP. It watches player combat interactions, identifies a disconnect during the combat window, and sends the event to Discord for review. Its purpose is to provide information for moderation, without automatically killing or punishing the player.',
    facts: [['Installed on', 'The server'], ['Combat window', '10 seconds'], ['Notifications', 'Discord webhook'], ['Project status', 'Archived']],
    sections: [
      {
        id: 'detection', title: 'From a PvP hit to a disconnect event.',
        text: 'The documented combat window is ten seconds after a player hits another player or is hit in PvP. If they leave during combat, the plugin identifies that disconnect as an event administrators can review.',
        steps: [{title: 'A PvP interaction is detected.', text: 'A player hits another player or receives a PvP hit.'}, {title: 'The player is marked in combat.', text: 'The documented combat tag lasts ten seconds after the interaction.'}, {title: 'Leaving becomes a report.', text: 'A disconnect during combat is recorded and can trigger a Discord notification.'}],
      },
      {
        id: 'discord', title: 'Keep event context in Discord.',
        text: 'A Discord-compatible webhook delivers notifications about combat logging. The published feature description includes the player name, world name, and X, Y, Z coordinates in the notification, so staff have context when reviewing what happened.',
        table: {caption: 'Information in a reported event', headers: ['Detail', 'Why it is included'], rows: [['Player name', 'Identifies the player who disconnected.'], ['World name', 'Shows which world the event occurred in.'], ['Coordinates', 'Provides the location associated with the event.']]},
        paragraphs: ['The webhook URL is configured in the plugin\'s generated config.yml. The project is a server plugin; ordinary players do not need to install a client mod to produce these reports.'],
      },
      {
        id: 'moderation', title: 'Detection without automatic punishment.',
        text: 'Combat Log Detector does not kill a player or apply a punishment for disconnecting. It supplies a report so administrators can decide how to handle an event under their own server rules.',
        paragraphs: ['That distinction is part of the project\'s published behavior. The plugin detects the disconnect and its context; it does not claim to know why a connection ended.'],
      },
      {
        id: 'setup', title: 'Set up the server notification path.',
        text: 'Place the matching plugin JAR in your server\'s plugins folder, start the server to generate config.yml, enter your Discord webhook URL, and restart the server to apply the configuration.',
        note: 'The original description covers a Spigot 1.16.5 / Java 8 build. Later Modrinth files list selected 1.16, 1.20, and 1.21 versions through 1.21.4. Use the exact release listing for compatibility; the original build notes do not describe every later file.',
      },
      {
        id: 'archive', title: 'Part of our plugin archive.',
        text: 'The project is archived on Modrinth. Its published files, description, and source remain useful references, but this page does not imply current development or support for newer Minecraft versions.',
      },
    ],
    links: [['View on Modrinth', 'https://modrinth.com/plugin/combat-log-detector-plugin'], ['Source code', 'https://github.com/perikIis20M/Combat-Log-Detector-Plugin']],
    sources: [['Modrinth documentation & releases', 'https://modrinth.com/plugin/combat-log-detector-plugin']],
  },
  bwhitelist: {
    intro: 'bwhitelist, also described as BetterWhitelist, is a server plugin for managing who may join. It focuses on player matching and everyday whitelist commands: handling case differences, adding offline players, and offering useful suggestions when administrators add or remove a name.',
    facts: [['Installed on', 'The server'], ['Matching', 'Case configurable'], ['Commands', '4 core actions'], ['Project status', 'Archived']],
    sections: [
      {
        id: 'matching', title: 'A more practical player list.',
        text: 'The published features include case-insensitive username matching and adding offline players to the whitelist. These address the friction of managing names and the familiar Player does not exist limitation described by the project.',
        paragraphs: ['Tab completion supports the command workflow: adding players suggests online names, and removing players suggests names already on the whitelist. The aim is to make maintaining the list more direct for server administrators.'],
      },
      {
        id: 'commands', title: 'Four commands for the daily work.',
        text: 'The /bwhitelist command is the entry point for adding, removing, inspecting, and reloading the list.',
        table: {caption: 'Whitelist commands', headers: ['Command', 'Purpose'], codeColumn: 0, rows: [['/bwhitelist add <player>', 'Add a player to the whitelist.'], ['/bwhitelist remove <player>', 'Remove a whitelisted player.'], ['/bwhitelist list', 'Display the current whitelist.'], ['/bwhitelist reload', 'Reload the whitelist.']]},
        paragraphs: ['The documented administrative permission is betterwhitelist.admin, available to operators by default. This gives administrators a specific permission to check when assigning access to whitelist management.'],
      },
      {
        id: 'configuration', title: 'Choose matching and save behavior.',
        text: 'config.yml controls case-insensitive matching and automatic saving. The documented example enables both and sets the automatic save interval to 300 seconds.',
        code: {language: 'YAML', text: 'case-insensitive: true\nauto-save: true\nauto-save-interval: 300'},
        paragraphs: ['Messages are kept separately in messages.yml. They include the join rejection message, permission errors, add/remove confirmations, duplicate or missing-player responses, and the reload confirmation. Those messages can be adjusted to match the language and tone of your server.'],
      },
      {
        id: 'installation', title: 'Install it as a server plugin.',
        text: 'Download a compatible release, place the JAR in the server\'s plugins directory, and restart. The project lists Bukkit, Purpur, and Spigot releases for selected Minecraft versions from 1.19.1 through 1.21.7.',
        paragraphs: ['Use the Versions tab to match a file to your actual server software and game version. This is a server-side whitelist tool, so players do not need a separate client installation.'],
      },
      {
        id: 'archive', title: 'An archived release you can still explore.',
        text: 'bwhitelist is archived on Modrinth. Its original description, files, and MIT license remain available there. Archived status is retained here so the page does not suggest an active release schedule.',
      },
    ],
    sources: [['Modrinth documentation & releases', 'https://modrinth.com/plugin/bwhitelist']],
  },
};
