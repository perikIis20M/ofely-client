export const site = {
  name: 'Bedwarsers',
  url: 'https://bwrs.online',
  description: 'Four friends making Minecraft our own. Explore the mods, tools, and SMPs made by the Bedwarsers team.',
  modrinth: 'https://modrinth.com/organization/bedwarsers',
};

export const people = {
  periklis: {
    name: 'Periklis20M', uuid: 'ca8bc9f3a0f7473481b7837313cd4305',
    avatar: 'periklis20m.webp', discord: '858601532090089472',
    role: 'Developer, server manager & tester',
    description: 'From building plugins to looking after the smallest server details.',
    links: [['Modrinth', 'https://modrinth.com/user/periklis20m'], ['SpigotMC', 'https://www.spigotmc.org/resources/authors/periklis20m.1566001/'], ['BuiltByBit', 'https://builtbybit.com/members/perikiis20m.595090/']],
  },
  john: {
    name: 'JohnFG', uuid: 'fdd4aec7b50a4d3c82b89338805d552e',
    skin: 'john-188e2903.png',
    skinSource: 'https://vzge.me/full/512/fdd4aec7b50a4d3c82b89338805d552e.png',
    avatar: 'johnfg.webp', discord: '848928238612512838',
    role: 'Developer, SMP founder & tester',
    description: 'Turning ideas into mods and the powers behind our survival worlds.',
    links: [['Modrinth', 'https://modrinth.com/user/JohnFG']],
  },
  foldar: {
    name: 'FoldarFlicker', uuid: '5844d0157e7e4a93aa7c98c56a243984',
    avatar: 'foldarflicker.webp', discord: '813504494171324447',
    role: 'Bounty SMP owner & tester',
    description: 'A friend, a tester, and one of the people behind Bounty SMP.',
    links: [],
  },
  ofely: {
    name: 'Ofely', uuid: 'e40b5b7587a04cf5830b63cae9b588ff',
    avatar: 'ofely.webp', discord: '1109849152390709388',
    role: 'Ofely Client owner, SMP admin & tester',
    description: 'Looking after our communities and helping put our projects to the test.',
    links: [],
  },
  theoatsa: {name: 'Theoatsa', uuid: '2988deb83b004bb29d406a219a2aa2d1', avatar: 'theoatsa.webp', links: []},
  ploopier: {name: 'Ploopier', uuid: 'e7d44249dd2644c39cfebef1292c72d1', avatar: 'ploopier.webp', links: []},
};

const shared = [['periklis', 'Developer & tester'], ['john', 'Developer & tester']];
export const projects = [
  {
    slug: 'rowglide', title: 'RowGlide', category: 'Mod', status: 'Released', icon: 'rowglide.webp', symbol: 'GripVertical', color: 'mint', platform: 'Fabric',
    summary: 'Your server list. Your order. Drag servers and resource packs exactly where you want them.',
    intro: 'A small quality-of-life improvement for a screen you use every day. RowGlide adds natural drag-and-drop controls to Minecraft\'s multiplayer server and resource-pack lists.',
    sections: [
      {title: 'A little less clicking.', text: 'Reorder multiplayer servers, set the priority of selected resource packs, and move packs between Available and Selected with a simple drag.', bullets: ['Drag multiplayer servers into your preferred order.', 'Reorder selected resource packs to change their priority.', 'Move packs between the Available and Selected columns.', 'Available packs retain Minecraft\'s normal ordering.']},
      {title: 'Made for your client.', text: 'RowGlide runs on the client with Fabric. Click and hold the text area of a server or resource pack, drag it to its new position, and release.'},
    ],
    links: [['View on Modrinth', 'https://modrinth.com/mod/rowglide']], credits: shared,
  },
  {
    slug: 'quitkeybind', title: 'QuitKeybind', category: 'Mod', status: 'Released', icon: 'quitkeybind.webp', symbol: 'LogOut', color: 'rose', platform: 'Fabric',
    summary: 'One key. A clean exit. Leave a server or singleplayer world with your own keybind.',
    intro: 'QuitKeybind makes leaving a Minecraft world a single action. Choose a key and use Minecraft\'s own disconnect flow without opening the pause menu.',
    sections: [
      {title: 'Your exit, one press away.', text: 'F8 is the default. Change it in Minecraft\'s Controls menu whenever you like.', bullets: ['A configurable disconnect keybind.', 'Native disconnect behavior for multiplayer.', 'Safe singleplayer saves through Minecraft\'s normal exit flow.', 'Client-side installation; no server mod required.']},
      {title: 'Fits into your setup.', text: 'The project supports Fabric profiles, including those created in the Modrinth App, and appears in Mod Menu.'},
    ], links: [['View on Modrinth', 'https://modrinth.com/mod/quitkeybind']], credits: shared,
  },
  {
    slug: 'improved-advancements-screen', title: 'Improved Advancements Screen', category: 'Mod', status: 'Under review', icon: 'advancements.webp', symbol: 'Trophy', color: 'gold', platform: 'Fabric',
    summary: 'See your progress, find what remains, and pick up exactly where you left off.',
    intro: 'An improved advancements screen with progress tracking, remaining requirements, stable layouts, and saved positions. Includes an optional classic achievements screen.',
    sections: [
      {title: 'Keep the journey in view.', text: 'Clearer progress and remembered positions make it easier to return to your advancement goals.', bullets: ['Progress tracking.', 'Remaining advancement requirements.', 'Stable layouts and saved positions.', 'An optional classic achievements screen.']},
      {title: 'A new release in review.', text: 'The project has been submitted to Modrinth and is awaiting review. A public download is not currently available.'},
    ], links: [], credits: shared, attribution: 'Based on Better Advancements by way2muchnoise. Original Minecraft artwork belongs to Mojang.',
  },
  {
    slug: 'op-login', title: 'Op Login', category: 'Plugin', status: 'Released', icon: 'op-login.webp', symbol: 'ShieldCheck', color: 'mint', platform: 'Server plugin',
    summary: 'Keep operator privileges locked until the right player authenticates.',
    intro: 'Op Login adds an authentication step to operator privileges. Operators can play normally while protected permissions stay locked until they are needed.',
    sections: [
      {title: 'An extra lock on admin access.', text: 'Authenticate to unlock privileges, then lock them again manually or automatically.', bullets: ['Locked operator sessions on join.', 'Password authentication and optional PIN keypad mode.', 'Unlock timeouts and failed-login protection.', 'Operator command auditing and an emergency lockdown command.']},
      {title: 'Built for server administrators.', text: 'Find the latest release, supported Minecraft versions, installation instructions, and configuration on the official project page.'},
    ], links: [['View on Modrinth', 'https://modrinth.com/plugin/op-login'], ['Source code', 'https://github.com/perikIis20M/OpLogin']], credits: [['periklis', 'Developer']],
  },
  {
    slug: 'combat-log-detector', title: 'Combat Log Detector', category: 'Plugin', status: 'Archived', icon: 'combat-log-detector.webp', symbol: 'Swords', color: 'rose', platform: 'Server plugin',
    summary: 'Keep track of combat disconnects, with notifications delivered to Discord.',
    intro: 'A Minecraft server plugin that detects players leaving during PvP and records the event for administrators. The project is archived on Modrinth.',
    sections: [
      {title: 'Information for fair moderation.', text: 'The plugin tracks PvP interactions and reports combat logging. It does not automatically punish or kill the player.', bullets: ['Tracks players who hit or are hit during PvP.', 'Detects disconnects during the combat window.', 'Discord webhook notifications with player and event details.', 'Events remain available for administrator review.']},
      {title: 'An archived project.', text: 'The published project remains available for reference. Check the official listing for version compatibility before using it.'},
    ], links: [['View on Modrinth', 'https://modrinth.com/plugin/combat-log-detector-plugin']], credits: [['periklis', 'Developer']],
  },
  {
    slug: 'bwhitelist', title: 'bwhitelist', category: 'Plugin', status: 'Archived', icon: 'bwhitelist.webp', symbol: 'ListCheck', color: 'sky', platform: 'Server plugin',
    summary: 'A friendlier whitelist, with better player matching and useful command suggestions.',
    intro: 'bwhitelist improves server whitelist management with case-insensitive matching, support for offline players, and helpful tab completion.',
    sections: [
      {title: 'Less friction at the front door.', text: 'Manage who can join with clearer commands and configurable messages.', bullets: ['Case-insensitive username matching.', 'Add offline players to the whitelist.', 'Suggestions when adding or removing players.', 'Configurable messages and auto-save settings.']},
      {title: 'An archived project.', text: 'The original release is still listed on Modrinth. Refer to that listing for its supported server platforms and Minecraft versions.'},
    ], links: [['View on Modrinth', 'https://modrinth.com/plugin/bwhitelist']], credits: [['periklis', 'Developer']],
  },
  {
    slug: 'smp-essentials', title: 'SMP Essentials', category: 'Mod', status: 'In development', symbol: 'Package', color: 'gold', platform: 'Minecraft mod',
    summary: 'Many useful quality-of-life features. One mod for your SMP.',
    intro: 'SMP Essentials is an SMP quality-of-life mod combining many useful features in one.',
    sections: [
      {title: 'Making the everyday better.', text: 'The project brings useful SMP quality-of-life features together in a single mod.'},
      {title: 'Taking time to improve.', text: 'An earlier version was published, then taken down so it could be improved. SMP Essentials is currently being reworked and is not available to download.'},
    ], links: [], credits: shared,
  },
  {
    slug: 'powerssmp', title: 'Powers SMP', category: 'SMP', status: 'Inactive', icon: 'powers-smp.webp', symbol: 'Zap', color: 'violet', platform: 'Private survival server',
    summary: 'Two years of powers, survival, and the kind of memories that stay with you.',
    intro: 'Powers SMP was our private, application-based survival server. For around two years, its custom powers and shared adventures gave us a world that felt like our own.',
    facts: [['The journey', 'Around 2 years'], ['Power levels', '-5 to +5'], ['Seasons', '1 & 2'], ['Today', 'Inactive']],
    sections: [
      {title: 'Every life changed your power.', text: 'Kills raised your power level by one, up to +5. Deaths lowered it by one, down to -5. Different powers and effects at each level made each fight matter.'},
      {title: 'Built together. Remembered together.', text: 'JohnFG founded the server, developed the powers plugin, and contributed ideas. Periklis20M co-owned and managed the server, looking after its operation, fairness, and the small details that made the experience feel complete.'},
      {title: 'A world we may return to.', text: 'Powers SMP is currently inactive. We have talked about bringing it back, but there is no announced return date. Its Discord community is part of the server\'s history.'},
    ], links: [], community: 'https://discord.gg/atnWHFGsnR',
    credits: [['john', 'Founder, co-owner & plugin developer'], ['periklis', 'Co-owner, server manager & tester'], ['ofely', 'Admin & tester']],
  },
  {
    slug: 'bountysmp', title: 'Bounty SMP', category: 'SMP', status: 'Inactive', icon: 'bounty-smp.webp', symbol: 'Crosshair', color: 'ember', platform: 'Private survival server',
    summary: 'Assigned targets, earned shards, and powers worth hunting for.',
    intro: 'A private, application-based survival server founded by Theoatsa, Ploopier, and FoldarFlicker. Bounty SMP turned the hunt for an assigned target into a path toward new powers.',
    facts: [['The journey', 'Around 2 months'], ['Target kills', '5 for a shard'], ['Seasons', '1 & 2'], ['Today', 'Inactive']],
    sections: [
      {title: 'Hunt. Earn. Craft.', text: 'Defeating your assigned target increased your target-kill count. Five target kills earned a shard, which could be used to craft powers.'},
      {title: 'An idea shaped by friends.', text: 'FoldarFlicker led the server as owner. Periklis20M joined as a helper, later became an admin, developed the plugin, and expanded its gameplay concept. JohnFG and Ofely also helped as admins.'},
      {title: 'A short chapter in our story.', text: 'Bounty SMP lasted around two months. Its demanding progression eventually lost the community\'s interest, and the server became inactive. It remains a meaningful part of what we built together.'},
    ], links: [], community: 'https://discord.gg/YDhZmCNvan',
    credits: [['foldar', 'Founder, owner & tester'], ['periklis', 'Plugin developer, admin & tester'], ['john', 'Admin'], ['ofely', 'Admin & tester'], ['theoatsa', 'Co-founder'], ['ploopier', 'Co-founder']],
  },
  {
    slug: 'ofely', title: 'Ofely Client', category: 'Client', status: 'Coming soon', icon: 'ofely-client.webp', symbol: 'Box', color: 'sky', platform: 'Minecraft launcher',
    summary: 'A Minecraft home for profiles, skins, worlds, and Modrinth content.',
    intro: 'Ofely Client is an unreleased Minecraft launcher designed to bring profiles, skins, worlds, Modrinth content, and optional in-game features together.',
    screenshot: 'launcher.png', screenshotAlt: 'The actual Ofely Client launcher interface',
    sections: [
      {title: 'Everything in one place.', text: 'A focused launcher for the things around the game, so your setup feels easier to look after.', bullets: ['Minecraft profiles and launching.', 'Skins and worlds.', 'Modrinth content.', 'Optional in-game features.']},
      {title: 'Still being built.', text: 'Ofely Client is in development and has not been released. There is no public download or announced release date.'},
    ], links: [], credits: [['ofely', 'Owner'], ['periklis', 'Developer']],
  },
  {
    slug: 'ofely-mod-updater', title: 'Ofely Mod Updater', category: 'Tool', status: 'Discontinued', symbol: 'RefreshCw', color: 'sky', platform: 'Minecraft utility',
    summary: 'A separate experiment in moving mod folders between Minecraft versions.',
    intro: 'Ofely Mod Updater was a separate tool for migrating an installed mods folder from one Minecraft version to another.',
    sections: [
      {title: 'A simpler move between versions.', text: 'The project explored verified mod downloads and clear compatibility warnings to help players move an existing mod setup between Minecraft versions.'},
      {title: 'Development has ended.', text: 'Ofely Mod Updater is discontinued. It is separate from Ofely Client, which remains in development.'},
    ], links: [], credits: [],
  },
];

export const team = ['periklis', 'john', 'foldar', 'ofely'];
