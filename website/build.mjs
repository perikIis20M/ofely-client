import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {site, projects, people, team} from './data.mjs';

const source = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(source, '../docs');
const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const icon = (name, cls = '') => `<svg class="icon ${cls}" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><use href="/assets/icons.svg#${esc(name)}"/></svg>`;
const link = (label, url, cls = 'button button-primary') => `<a class="${cls}" href="${esc(url)}"${url.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : ''}>${esc(label)}${icon(url.startsWith('http') ? 'ArrowUpRight' : 'ArrowRight')}</a>`;
const projectMark = (p, cls = '') => p.icon
  ? `<img class="project-icon ${cls}" src="/assets/${p.icon}" width="72" height="72" alt="${esc(p.title)} icon" loading="lazy">`
  : `<span class="project-icon project-icon-symbol ${cls}" aria-hidden="true">${icon(p.symbol)}</span>`;

function status(p) {
  const state = p.status === 'Released' ? 'released' : ['Coming soon','In development','Under review'].includes(p.status) ? 'development' : 'inactive';
  return `<span class="status status-${state}"><span></span>${esc(p.status)}</span>`;
}

function header(active) {
  return `<a class="skip-link" href="#main">Skip to content</a>
  <header class="header"><div class="header-inner">
    <a class="brand" href="/" aria-label="Bedwarsers home"><img src="/assets/bedwarsers.webp" width="42" height="42" alt=""><span>BEDWARSERS<span class="brand-small">A MINECRAFT COLLECTIVE</span></span></a>
    <nav class="desktop-nav" aria-label="Main navigation">${[['Home','/','home'],['Projects','/projects/','projects'],['Our SMPs','/smps/','smps'],['The Team','/team/','team']].map(([text,url,key])=>`<a href="${url}"${active === key ? ' aria-current="page"' : ''}>${text}</a>`).join('')}</nav>
    <a class="header-modrinth" href="${site.modrinth}" target="_blank" rel="noopener noreferrer">${icon('Blocks')}<span>Modrinth</span>${icon('ArrowUpRight')}</a>
    <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-menu">${icon('Menu')}</button>
  </div><nav class="mobile-nav" id="mobile-menu" aria-label="Mobile navigation" hidden>${[['Home','/'],['Projects','/projects/'],['Our SMPs','/smps/'],['The Team','/team/']].map(([text,url])=>`<a href="${url}">${text}${icon('ArrowUpRight')}</a>`).join('')}</nav></header>`;
}

function footer() {
  return `<footer class="footer"><div class="wrap footer-top"><a class="brand" href="/"><img src="/assets/bedwarsers.webp" width="42" height="42" alt=""><span>BEDWARSERS<span class="brand-small">A FEW FRIENDS. A LOT OF BLOCKS.</span></span></a><div class="footer-links"><a href="/projects/">Projects</a><a href="/team/">The team</a><a href="${site.modrinth}" target="_blank" rel="noopener noreferrer">Modrinth ${icon('ArrowUpRight')}</a></div></div><div class="wrap footer-bottom"><span>&copy; ${new Date().getUTCFullYear()} Bedwarsers Team</span><span>Made with care, one block at a time.</span><small>Not an official Minecraft website. Not affiliated with Mojang or Microsoft.</small></div></footer>`;
}

function shell(title, description, body, {active = 'projects', route = '/', image = '/assets/island-scene.webp'} = {}) {
  return `<!doctype html><html lang="en"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}${title === 'Bedwarsers' ? ' | Made of blocks. Built by friends.' : ' | Bedwarsers'}</title>
  <meta name="description" content="${esc(description)}"><meta name="theme-color" content="#151817">
  <meta property="og:title" content="${esc(title)} | Bedwarsers"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="website"><meta property="og:url" content="${site.url}${route}"><meta property="og:image" content="${site.url}${image}"><meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="${site.url}${route}"><link rel="icon" href="/assets/bedwarsers.webp" type="image/webp"><link rel="apple-touch-icon" href="/assets/bedwarsers.webp">
  <link rel="preload" href="/assets/Minecraft.ttf" as="font" type="font/ttf" crossorigin>
  <link rel="stylesheet" href="/styles.css?v=bedwarsers-20261019"><script src="/script.js?v=bedwarsers-20261019" defer></script>
  </head><body>${header(active)}<main id="main">${body}</main>${footer()}</body></html>`;
}

function card(p) {
  return `<article class="project-card ${p.color}" data-category="${p.category}" data-search="${esc(`${p.title} ${p.summary} ${p.category} ${p.status}`.toLowerCase())}"><a class="card-link" href="/${p.slug}/" aria-label="Explore ${esc(p.title)}"><div class="card-top">${projectMark(p)}${icon('ArrowUpRight','card-arrow')}</div><div class="card-meta"><span>${p.category}</span>${status(p)}</div><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p><span class="card-bottom">Explore project ${icon('ArrowRight')}</span></a></article>`;
}

function serverCard(p) {
  return `<article class="server-card ${p.color}"><a href="/${p.slug}/"><div class="server-art">${projectMark(p)}<span class="server-art-label">${p.category} / ${p.slug === 'powerssmp' ? '01' : '02'}</span></div><div class="server-copy"><div class="card-meta"><span>PRIVATE SURVIVAL</span>${status(p)}</div><h3>${p.title}</h3><p>${p.summary}</p><span class="text-link">Explore its story ${icon('ArrowRight')}</span></div></a></article>`;
}

function teamCards() {
  return `<div class="team-grid">${team.map((key,i)=>{const p=people[key];return `<article class="member"><div class="member-scene member-scene-${i}"><span class="member-number">0${i+1}</span><img class="skin" src="/assets/skins/${key}.png" alt="${esc(p.name)}'s Minecraft character" width="150" height="300" loading="lazy"><img class="discord-avatar" src="/assets/portraits/${p.avatar}" alt="${esc(p.name)}'s profile picture" width="56" height="56" loading="lazy"></div><div class="member-details"><h3>${p.name}</h3><p class="member-role">${p.role}</p><p>${p.description}</p><div class="member-links"><a href="https://discord.com/users/${p.discord}" target="_blank" rel="noopener noreferrer">Discord ${icon('ArrowUpRight')}</a>${p.links.slice(0,1).map(([label,url])=>`<a href="${url}" target="_blank" rel="noopener noreferrer">${label} ${icon('ArrowUpRight')}</a>`).join('')}${p.links.length>1 ? `<details class="profile-more"><summary aria-label="More profiles for ${p.name}">More ${icon('ChevronDown')}</summary><div>${p.links.slice(1).map(([label,url])=>`<a href="${url}" target="_blank" rel="noopener noreferrer">${label} ${icon('ArrowUpRight')}</a>`).join('')}</div></details>` : ''}</div></div></article>`;}).join('')}</div>`;
}

function scene() {
  return `<div class="sky-scene" aria-hidden="true"><img class="sky-plate" src="/assets/island-sky.webp" width="1672" height="941" alt="" fetchpriority="high"><img class="floating-island island-main" src="/assets/island-main.webp" width="1300" height="867" alt="" fetchpriority="high"><img class="floating-island island-far" src="/assets/island-main.webp" width="1300" height="867" alt=""><img class="floating-island island-distant" src="/assets/island-main.webp" width="1300" height="867" alt=""></div>`;
}

function home() {
  const featured = ['rowglide','quitkeybind','improved-advancements-screen','ofely'].map(slug=>projects.find(p=>p.slug===slug));
  return shell('Bedwarsers', site.description, `
    <section class="hero">${scene()}<div class="wrap hero-content"><div class="hero-kicker"><span class="pixel-spark"></span> A LITTLE TEAM. A BIG MINECRAFT WORLD.</div><h1>BED<span>WARSERS</span><span class="heading-period">.</span></h1><p class="hero-tagline">Made of blocks.<br>Built by friends.</p><p class="hero-description">Mods that make the little things better.<br>Worlds that give us stories to tell.</p><div class="hero-actions">${link('Explore our projects','/projects/')} ${link('Meet the team','/team/','button button-glass')}</div><div class="hero-credit"><div class="avatar-stack">${team.map(key=>`<img src="/assets/portraits/${people[key].avatar}" width="32" height="32" alt="${people[key].name}">`).join('')}</div><span>Four friends. One shared world.</span></div></div><div class="hero-caption"><span class="tiny-cross">+</span> A place for the things we create.</div><a class="hero-scroll" href="#featured" aria-label="Scroll to featured projects">${icon('ArrowDown')}</a></section>
    <div class="identity-strip"><div class="wrap"><span>${icon('Blocks')} MINECRAFT AT HEART</span><span>${icon('Code2')} BUILT BY US</span><span>${icon('Users')} PLAYED TOGETHER</span><span>${icon('Heart')} MADE WITH CARE</span></div></div>
    <section class="section wrap" id="featured"><div class="section-heading"><div><span class="eyebrow">FROM OUR WORKBENCH</span><h2>Small ideas.<br><span>Better adventures.</span></h2></div><div class="section-intro"><p>A collection of mods, plugins, and tools we've made along the way. Some are ready to play. Others are still taking shape.</p><a class="text-link" href="/projects/">All projects ${icon('ArrowUpRight')}</a></div></div><div class="project-grid">${featured.map(card).join('')}</div></section>
    <section class="smp-section"><div class="wrap"><div class="section-heading"><div><span class="eyebrow">MORE THAN A SERVER</span><h2>Our worlds.<br><span>Our stories.</span></h2></div><div class="section-intro"><p>Private survival worlds, custom powers, and a lot of good memories. These servers are inactive, but their stories belong here.</p></div></div><div class="server-grid">${projects.filter(p=>p.category==='SMP').map(serverCard).join('')}</div></div></section>
    <section class="section wrap"><div class="section-heading"><div><span class="eyebrow">THE PEOPLE BEHIND THE BLOCKS</span><h2>Four friends.<br><span>One team.</span></h2></div><div class="section-intro"><p>Developing, testing, managing, and playing. We all bring something different to the same table.</p></div></div>${teamCards()}</section>
    <section class="modrinth-band"><div class="wrap"><div>${icon('Blocks')}<div><span class="eyebrow">FIND OUR RELEASES</span><h2>Next stop: Modrinth.</h2><p>Browse our published mods and follow what we're making.</p></div></div>${link('Visit our organization',site.modrinth,'button button-dark')}</div></section>
  `, {active:'home',route:'/'});
}

function catalog() {
  return shell('Our Projects', 'Explore every Bedwarsers mod, plugin, SMP, and tool. Find releases, development projects, and the people who made them.', `
  <section class="page-heading wrap"><span class="eyebrow">THE BEDWARSERS WORKBENCH</span><h1>Our projects<span class="gold-text">.</span></h1><p>Useful little mods. Personal tools. Worlds we called home.<br>Everything we've made, all in one place.</p></section>
  <section class="wrap catalog"><div class="catalog-controls"><div class="filter-tabs" role="group" aria-label="Filter projects by type">${['All','Mod','Plugin','Client','Tool','SMP'].map((name,i)=>`<button type="button" data-filter="${name}" aria-pressed="${!i}">${name === 'All' ? 'All projects' : name === 'SMP' ? 'SMPs' : name+'s'}</button>`).join('')}</div><label class="search-field">${icon('Search')}<input type="search" id="project-search" aria-label="Search projects" placeholder="Find a project..."></label></div><p class="catalog-count" id="catalog-count" aria-live="polite">${projects.length} projects</p><div class="project-grid catalog-grid">${projects.map(card).join('')}</div><div class="empty-state" hidden>${icon('Search')}<h2>No projects found.</h2><p>Try another search or choose a different category.</p><button class="button button-outline" id="reset-filters" type="button">Reset filters ${icon('RefreshCw')}</button></div></section>
  `, {route:'/projects/'});
}

function credits(p) {
  if (!p.credits.length) return `<section class="credits-section"><div class="wrap"><span class="eyebrow">FROM THE TEAM ARCHIVE</span><h2>A Bedwarsers project.</h2><a class="text-link" href="/team/">Meet the team ${icon('ArrowUpRight')}</a></div></section>`;
  return `<section class="credits-section"><div class="wrap"><span class="eyebrow">THE PEOPLE BEHIND IT</span><h2>Made together.</h2><div class="credits-grid">${p.credits.map(([key,role])=>{const person=people[key];return `<div class="contributor"><img src="/assets/portraits/${person.avatar}" alt="" width="64" height="64" loading="lazy"><div><h3>${person.name}</h3><p>${role}</p></div>${person.discord ? `<a href="https://discord.com/users/${person.discord}" target="_blank" rel="noopener noreferrer" aria-label="${person.name} on Discord">${icon('ArrowUpRight')}</a>` : ''}</div>`;}).join('')}</div>${p.attribution ? `<p class="attribution">${esc(p.attribution)}</p>` : ''}</div></section>`;
}

function detail(p) {
  const related = projects.filter(other=>other.slug!==p.slug).sort((a,b)=>Number(b.category===p.category)-Number(a.category===p.category)).slice(0,3);
  return shell(p.title, p.summary, `
    <section class="project-heading ${p.color}"><div class="wrap"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/projects/">Projects</a><span>/</span><span aria-current="page">${p.title}</span></nav><div class="project-heading-main"><div class="project-title-group">${projectMark(p)}<div><span class="eyebrow">${p.category.toUpperCase()} / BEDWARSERS</span><h1>${p.title}</h1></div></div>${status(p)}</div><p class="project-lead">${p.summary}</p><div class="project-actions">${p.links.slice(0,1).map(([label,url])=>link(label,url)).join('')}<a class="text-link" href="#about">Explore ${icon('ArrowDown')}</a></div></div></section>
    <div class="wrap detail-layout" id="about"><article class="project-body"><span class="eyebrow">ABOUT THE PROJECT</span><p class="project-intro">${p.intro}</p>${p.screenshot ? `<figure class="launcher-shot"><img src="/assets/${p.screenshot}" width="1280" height="720" alt="${p.screenshotAlt}" loading="lazy"><figcaption>The actual Ofely Client launcher, currently in development.</figcaption></figure>` : ''}${p.facts ? `<dl class="server-facts">${p.facts.map(([label,value])=>`<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}</dl>` : ''}${p.sections.map((s,i)=>`<section class="story-section"><span class="story-number">0${i+1}</span><h2>${s.title}</h2><p>${s.text}</p>${s.bullets ? `<ul class="feature-list">${s.bullets.map(text=>`<li>${icon('Check')}<span>${esc(text)}</span></li>`).join('')}</ul>` : ''}</section>`).join('')}${p.community ? `<p class="community-note">${icon('Users')}The server's community was on <a href="${p.community}" target="_blank" rel="noopener noreferrer">Discord ${icon('ArrowUpRight')}</a>.</p>` : ''}</article><aside class="project-aside" aria-label="Project details"><span class="eyebrow">AT A GLANCE</span><dl><div><dt>Status</dt><dd>${status(p)}</dd></div><div><dt>Project type</dt><dd>${p.category}</dd></div><div><dt>Platform</dt><dd>${p.platform}</dd></div><div><dt>Team</dt><dd><a href="/team/">Bedwarsers ${icon('ArrowUpRight')}</a></dd></div></dl>${p.links.length ? `<div class="aside-links"><span class="eyebrow">OFFICIAL LINKS</span>${p.links.map(([label,url])=>link(label,url,'aside-link')).join('')}</div>` : ''}<a class="back-link" href="/projects/">${icon('ArrowLeft')} Back to all projects</a></aside></div>
    ${credits(p)}<section class="section wrap related"><div class="section-heading"><div><span class="eyebrow">KEEP EXPLORING</span><h2>More from the team.</h2></div><a class="text-link" href="/projects/">All projects ${icon('ArrowUpRight')}</a></div><div class="project-grid related-grid">${related.map(card).join('')}</div></section>
  `, {route:`/${p.slug}/`,active:p.category==='SMP'?'smps':'projects',image:p.icon?`/assets/${p.icon}`:'/assets/island-scene.webp'});
}

await fs.mkdir(out, {recursive:true});
await fs.writeFile(path.join(out,'index.html'),home());
await fs.copyFile(path.join(source,'styles.css'),path.join(out,'styles.css'));
await fs.copyFile(path.join(source,'script.js'),path.join(out,'script.js'));
const pages = new Map([
  ['projects',catalog()],
  ['team',shell('The Team','Meet Periklis20M, JohnFG, FoldarFlicker, and Ofely: the four friends behind Bedwarsers.',`<section class="page-heading wrap"><span class="eyebrow">THE PEOPLE BEHIND THE BLOCKS</span><h1>Four friends.<br>One team<span class="gold-text">.</span></h1><p>We build things we'd want to use, create worlds we'd want to play in,<br>and help each other make them better.</p></section><section class="wrap team-page">${teamCards()}</section><section class="wrap team-outro"><span class="eyebrow">SAME TEAM, DIFFERENT TALENTS</span><h2>Everyone brings a piece.</h2><p>Code, ideas, testing, and the countless details that keep a server running. Our projects are better because we make them together.</p>${link('See what we make','/projects/','button button-outline')}</section>`,{active:'team',route:'/team/'})],
  ['smps',shell('Our SMPs','Explore the stories of Powers SMP and Bounty SMP, the private survival servers built and played by our friends.',`<section class="page-heading wrap"><span class="eyebrow">WORLDS WE CALLED HOME</span><h1>Our SMPs<span class="gold-text">.</span></h1><p>Custom powers, good friends, and memories worth keeping.<br>Both servers are currently inactive.</p></section><section class="wrap smps-page"><div class="server-grid">${projects.filter(p=>p.category==='SMP').map(serverCard).join('')}</div></section>`,{active:'smps',route:'/smps/'})],
  ...projects.map(p=>[p.slug,detail(p)]),
]);
for (const [slug,html] of pages) {
  await fs.mkdir(path.join(out,slug),{recursive:true});
  await fs.writeFile(path.join(out,slug,'index.html'),html);
}
await fs.mkdir(path.join(out,'rawglide'),{recursive:true});
await fs.writeFile(path.join(out,'rawglide/index.html'),'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=/rowglide/"><link rel="canonical" href="https://bwrs.online/rowglide/"><title>RowGlide | Bedwarsers</title></head><body><a href="/rowglide/">Continue to RowGlide</a></body></html>');
await fs.writeFile(path.join(out,'404.html'),shell('Page not found','This page could not be found. Explore the Bedwarsers projects or return home.',`<section class="wrap not-found"><span class="eyebrow">OUTSIDE THE WORLD BORDER</span><h1>Lost a block?</h1><p>That page isn't here. Let's get you back to familiar ground.</p>${link('Back to home','/')}</section>`,{active:'',route:'/404.html'}));
await fs.writeFile(path.join(out,'.nojekyll'),'');
await fs.writeFile(path.join(out,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
await fs.writeFile(path.join(out,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/',...[...pages.keys()].map(slug=>`/${slug}/`)].map(route=>`<url><loc>${site.url}${route}</loc></url>`).join('')}</urlset>`);
console.log(`Built ${pages.size+1} pages, a RowGlide alias, and a 404 page into docs/.`);
