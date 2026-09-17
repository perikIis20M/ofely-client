# Publish Ofely Client

## 1. Create the GitHub repository

Create a new **public** repository named `ofely-client`. Leave the GitHub README, license, and `.gitignore` options unchecked because this folder already contains them.

From this folder in PowerShell, replace the placeholder values and run:

```powershell
git config user.name "YOUR GITHUB NAME"
git config user.email "YOUR GITHUB NOREPLY EMAIL"
git add .
git commit -m "Launch Ofely coming soon site"
git remote add origin https://github.com/YOUR-USERNAME/ofely-client.git
git push -u origin main
```

## 2. Enable GitHub Pages

In the repository, open **Settings > Pages**.

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/docs**

Save it, then set the custom domain to `bwrs.online`.

## 3. Point Cloudflare to GitHub Pages

In Cloudflare DNS, remove conflicting `A`, `AAAA`, `ALIAS`, or `CNAME` records for the root domain, then add these four records. Keep them **DNS only** while GitHub provisions the certificate.

| Type | Name | Content |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Optionally add `www`:

| Type | Name | Content |
| --- | --- | --- |
| CNAME | www | YOUR-USERNAME.github.io |

After GitHub finishes its DNS check and certificate setup, enable **Enforce HTTPS** in the Pages settings.

## 4. CurseForge application URLs

- Website URL: `https://bwrs.online`
- Git URL: `https://github.com/YOUR-USERNAME/ofely-client`
