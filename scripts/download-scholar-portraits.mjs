#!/usr/bin/env node
/**
 * Downloads scholar portrait images via the Wikipedia REST summary API.
 * Falls back to Wikimedia Commons search when no thumbnail exists.
 */
import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../src/assets/scholars/portraits");

/** slug → Wikipedia article title */
const SCHOLARS = {
  "al-fazari": "Muhammad ibn Ibrahim al-Fazari",
  "al-farghani": "Al-Farghani",
  "al-battani": "Al-Battani",
  "abd-al-rahman-al-sufi": "Abd al-Rahman al-Sufi",
  "ibn-yunus": "Ibn Yunus",
  "al-zarqali": "Abū Ishāq Ibrāhīm al-Zarqālī",
  "nasir-al-din-al-tusi": "Nasir al-Din al-Tusi",
  "ibn-al-shatir": "Ibn al-Shatir",
  "ulugh-beg": "Ulugh Beg",
  "ali-qushji": "Ali Qushji",
  "al-khwarizmi": "Muhammad ibn Musa al-Khwarizmi",
  "thabit-ibn-qurra": "Thabit ibn Qurra",
  "abu-al-wafa-al-buzjani": "Abu'l-Wafa'",
  "abu-nasr-mansur": "Abu Nasr Mansur",
  "omar-khayyam": "Omar Khayyam",
  "sharaf-al-din-al-tusi": "Sharaf al-Din al-Tusi",
  "jamshid-al-kashi": "Jamshid al-Kashi",
  "al-razi": "Muhammad ibn Zakariya al-Razi",
  "ali-ibn-sahl-rabban-al-tabari": "Ali ibn Sahl Rabban al-Tabari",
  "al-zahrawi": "Al-Zahrawi",
  "ibn-sina-medicine": "Avicenna",
  "ibn-zuhr": "Ibn Zuhr",
  "ibn-al-nafis": "Ibn al-Nafis",
  "al-biruni-medicine": "Al-Biruni",
  "al-kindi": "Al-Kindi",
  "al-farabi": "Al-Farabi",
  "ibn-sina-philosophy": "Avicenna",
  "al-ghazali": "Al-Ghazali",
  "ibn-bajjah": "Ibn Bajjah",
  "ibn-tufayl": "Ibn Tufayl",
  "ibn-rushd": "Averroes",
  "banu-musa-brothers": "Banu Musa brothers",
  "al-jazari": "Al-Jazari",
  "abbas-ibn-firnas": "Abbas ibn Firnas",
  "taqi-al-din": "Taqi ad-Din Muhammad ibn Ma'ruf",
  "al-biruni-geography": "Al-Biruni",
  "al-idrisi": "Muhammad al-Idrisi",
  "al-maqdisi": "Al-Maqdisi",
  "abu-zayd-al-balkhi": "Abu Zayd al-Balkhi",
  "ibn-battuta": "Ibn Battuta",
};

/** slug → Commons search query when Wikipedia has no image */
const COMMONS_FALLBACK = {
  "al-fazari": "Islamic astrolabe",
  "ali-ibn-sahl-rabban-al-tabari": "medieval islamic medicine manuscript",
  "sharaf-al-din-al-tusi": "Sharaf al-Din al-Tusi",
  "banu-musa-brothers": "Banu Musa brothers",
  "al-biruni-geography": "Al-Biruni India",
  "al-maqdisi": "Al-Maqdisi geography",
  "abu-zayd-al-balkhi": "Suwar al-aqalim",
  "ibn-yunus": "Ibn Yunus astronomy",
};

async function fetchWithRetry(url, options = {}, attempts = 5) {
  for (let i = 0; i < attempts; i++) {
    const res = await fetch(url, {
      ...options,
      headers: {
        "User-Agent": "IMPMS-Website/1.0 (scholar portrait downloader; contact@impms.org)",
        ...options.headers,
      },
    });
    if (res.status === 429) {
      await sleep(3000 * (i + 1));
      continue;
    }
    return res;
  }
  throw new Error(`rate limited: ${url}`);
}

async function fetchJson(url) {
  const res = await fetchWithRetry(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function wikipediaThumbnail(title) {
  const encoded = encodeURIComponent(title.replace(/ /g, "_"));
  const data = await fetchJson(`https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`);
  return data.thumbnail?.source ?? null;
}

async function commonsSearchThumbnail(query) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: `filetype:bitmap ${query}`,
    gsrnamespace: "6",
    gsrlimit: "5",
    prop: "imageinfo",
    iiprop: "url|mime",
    iiurlwidth: "800",
    format: "json",
    origin: "*",
  });
  const data = await fetchJson(`https://commons.wikimedia.org/w/api.php?${params}`);
  const pages = data.query?.pages ?? {};
  for (const page of Object.values(pages)) {
    const info = page.imageinfo?.[0];
    if (info?.thumburl && info.mime?.startsWith("image/")) {
      return info.thumburl;
    }
  }
  return null;
}

function extFromUrl(url) {
  const match = url.match(/\.(jpe?g|png|webp|gif)(?:\?|$)/i);
  return match ? match[1].toLowerCase().replace("jpeg", "jpg") : "jpg";
}

async function downloadImage(url, dest) {
  const res = await fetchWithRetry(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`download failed ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 500) throw new Error("file too small");
  await writeFile(dest, buf);
}

async function portraitExists(slug) {
  for (const ext of ["jpg", "jpeg", "png", "webp", "gif"]) {
    try {
      await access(path.join(OUT_DIR, `${slug}.${ext}`));
      return true;
    } catch {
      // continue
    }
  }
  return false;
}

async function resolveImageUrl(slug, title) {
  let url = await wikipediaThumbnail(title);
  if (url) return url;

  const fallbackQuery = COMMONS_FALLBACK[slug];
  if (fallbackQuery) {
    url = await commonsSearchThumbnail(fallbackQuery);
    if (url) return url;
  }

  url = await commonsSearchThumbnail(title);
  return url;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const failures = [];

  for (const [slug, title] of Object.entries(SCHOLARS)) {
    if (await portraitExists(slug)) {
      console.log(`→ ${slug} … skipped (exists)`);
      continue;
    }

    process.stdout.write(`→ ${slug} … `);
    try {
      const url = await resolveImageUrl(slug, title);
      if (!url) throw new Error("no image found");

      const ext = extFromUrl(url);
      const dest = path.join(OUT_DIR, `${slug}.${ext}`);
      await downloadImage(url, dest);
      console.log(`✓ ${path.basename(dest)}`);
    } catch (err) {
      console.log(`✗ ${err.message}`);
      failures.push({ slug, title, error: err.message });
    }

    await sleep(1500);
  }

  console.log(`\nDownloaded ${Object.keys(SCHOLARS).length - failures.length}/${Object.keys(SCHOLARS).length}`);
  if (failures.length) {
    console.log("\nFailures:");
    for (const f of failures) console.log(`  ${f.slug}: ${f.error}`);
    process.exitCode = 1;
  }
}

main();
