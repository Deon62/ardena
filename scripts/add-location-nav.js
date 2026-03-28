/**
 * Adds the standard footer "Locations" column (Nairobi, Mombasa, Kisumu, Nakuru)
 * after Navigation and before Contact when missing. Does not change the navbar.
 *
 * Skips: pages without footer-main, pages that already include a Locations column,
 * host-interest / partner / reset-password (no standard footer).
 *
 * Usage:
 *   node scripts/add-location-nav.js
 *   node scripts/add-location-nav.js --dry-run --verbose
 *
 * npm: npm run footer:locations
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const verbose = args.includes("--verbose");

/** Navigation column immediately followed by Contact column (no Locations yet) */
const FOOTER_NAV_THEN_CONTACT =
  /(<div class="footer-col">\s*<h4 class="footer-col-title">Navigation<\/h4>[\s\S]*?<\/ul>\s*<\/div>)(\s*\n)(\s*)(<div class="footer-col">\s*<h4 class="footer-col-title">Contact<\/h4>)/g;

const HAS_LOCATIONS_COLUMN = /<h4 class="footer-col-title">Locations<\/h4>/;

function buildLocationsBlock(indent) {
  const i = indent;
  return `${i}<div class="footer-col">
${i}    <h4 class="footer-col-title">Locations</h4>
${i}    <ul class="footer-links">
${i}        <li><a href="/car-rental-nairobi">Nairobi</a></li>
${i}        <li><a href="/car-rental-mombasa">Mombasa</a></li>
${i}        <li><a href="/car-rental-kisumu">Kisumu</a></li>
${i}        <li><a href="/car-rental-nakuru">Nakuru</a></li>
${i}    </ul>
${i}</div>`;
}

function processHtml(content, filePath) {
  if (!content.includes('class="footer-main"')) {
    return { content, changed: false, reason: "no footer-main" };
  }
  if (HAS_LOCATIONS_COLUMN.test(content)) {
    return { content, changed: false, reason: "Locations column already present" };
  }
  let replaced = 0;
  const next = content.replace(
    FOOTER_NAV_THEN_CONTACT,
    (match, navBlock, nl, indent, contactOpen) => {
      replaced += 1;
      const locations = buildLocationsBlock(indent);
      return `${navBlock}${nl}${locations}${nl}${indent}${contactOpen}`;
    },
  );
  if (replaced === 0) {
    return {
      content,
      changed: false,
      reason: "footer pattern did not match (check Navigation/Contact markup)",
    };
  }
  return { content: next, changed: true, reason: null };
}

function main() {
  const entries = fs.readdirSync(root, { withFileTypes: true });
  const htmlFiles = entries
    .filter((e) => e.isFile() && e.name.endsWith(".html"))
    .map((e) => e.name)
    .sort();

  let updated = 0;
  let skipped = 0;

  for (const name of htmlFiles) {
    const filePath = path.join(root, name);
    const before = fs.readFileSync(filePath, "utf8");
    const { content, changed, reason } = processHtml(before, filePath);

    if (changed) {
      if (verbose || dryRun) {
        console.log(dryRun ? "[dry-run] would update:" : "updated:", name);
      } else {
        console.log("updated:", name);
      }
      if (!dryRun) {
        fs.writeFileSync(filePath, content, "utf8");
      }
      updated += 1;
    } else {
      if (verbose) {
        console.log("skip:", name, reason ? `(${reason})` : "");
      }
      skipped += 1;
    }
  }

  console.log(
    dryRun
      ? `\nDry run: ${updated} file(s) would be updated, ${skipped} skipped.`
      : `\nDone: ${updated} file(s) updated, ${skipped} skipped.`,
  );
  if (dryRun && updated > 0) {
    console.log("Run without --dry-run to apply.");
  }
}

main();
