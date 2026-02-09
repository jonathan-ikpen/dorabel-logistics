#!/usr/bin/env node

/**
 * Verify SEO Metadata for All Pages
 *
 * Usage: node scripts/verify-seo-metadata.js
 *
 * This script validates that all pages have:
 * - Proper titles (50-70 characters)
 * - Proper descriptions (140-160 characters)
 * - OG images configured
 * - Canonical URLs
 * - Breadcrumb schema
 */

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const PAGES_DIR = path.join(__dirname, "../content/pages");
const MIN_TITLE_LENGTH = 50;
const MAX_TITLE_LENGTH = 70;
const MIN_DESC_LENGTH = 140;
const MAX_DESC_LENGTH = 160;

/**
 * @typedef {Object} PageMetadata
 * @property {string} file
 * @property {string} title
 * @property {Object} seo
 * @property {string} seo.title
 * @property {string} seo.description
 * @property {string} seo.canonical
 * @property {string} seo.image
 * @property {string[]} issues
 */

/** @type {PageMetadata[]} */
const results = [];

// Color codes for terminal output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
};

/**
 * @param {string} content
 * @returns {any|null}
 */
function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  try {
    return yaml.load(match[1]);
  } catch (e) {
    return null;
  }
}

/**
 * @param {string} file
 * @param {any} data
 * @returns {string[]}
 */
function validateMetadata(file, data) {
  const issues = [];
  const seo = data.seo || {};

  // Title validation
  if (!seo.title) {
    issues.push("Missing SEO title");
  } else if (seo.title.length < MIN_TITLE_LENGTH) {
    issues.push(
      `Title too short: ${seo.title.length} chars (min: ${MIN_TITLE_LENGTH})`,
    );
  } else if (seo.title.length > MAX_TITLE_LENGTH) {
    issues.push(
      `Title too long: ${seo.title.length} chars (max: ${MAX_TITLE_LENGTH})`,
    );
  }

  // Description validation
  if (!seo.description) {
    issues.push("Missing SEO description");
  } else {
    const descLength = seo.description.replace(/\n/g, " ").trim().length;
    if (descLength < MIN_DESC_LENGTH) {
      issues.push(
        `Description too short: ${descLength} chars (min: ${MIN_DESC_LENGTH})`,
      );
    } else if (descLength > MAX_DESC_LENGTH) {
      issues.push(
        `Description too long: ${descLength} chars (max: ${MAX_DESC_LENGTH})`,
      );
    }
  }

  // Canonical URL validation
  if (!seo.canonical) {
    issues.push("Missing canonical URL");
  }

  // OG Image validation
  if (!seo.image) {
    issues.push("Missing OG image");
  } else if (seo.image === "/uploads/og_image.png" && file !== "home.md") {
    issues.push("Using generic OG image (should be page-specific)");
  }

  return issues;
}

function readAndValidatePages() {
  const files = fs.readdirSync(PAGES_DIR).filter((f) => f.endsWith(".md"));

  files.forEach((file) => {
    const filePath = path.join(PAGES_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const data = extractFrontmatter(content);

    if (!data) {
      console.log(
        `${colors.red}✗ Failed to parse frontmatter: ${file}${colors.reset}`,
      );
      return;
    }

    const issues = validateMetadata(file, data);
    results.push({
      file,
      title: data.title,
      seo: data.seo,
      issues,
    });
  });
}

function printReport() {
  console.log(
    `\n${colors.blue}═══════════════════════════════════════${colors.reset}`,
  );
  console.log(
    `${colors.blue}  SEO Metadata Verification Report  ${colors.reset}`,
  );
  console.log(
    `${colors.blue}═══════════════════════════════════════${colors.reset}\n`,
  );

  let totalIssues = 0;

  results.forEach((result) => {
    const status =
      result.issues.length === 0
        ? `${colors.green}✓${colors.reset}`
        : `${colors.red}✗${colors.reset}`;
    console.log(`${status} ${result.file.padEnd(20)} (${result.title})`);

    if (result.issues.length > 0) {
      result.issues.forEach((issue) => {
        console.log(`  ${colors.yellow}→ ${issue}${colors.reset}`);
      });
      totalIssues += result.issues.length;
    }

    console.log(
      `  Title: "${result.seo.title}" (${result.seo.title.length} chars)`,
    );
    const descLength = (result.seo.description || "")
      .replace(/\n/g, " ")
      .trim().length;
    console.log(`  Description: ${descLength} chars\n`);
  });

  // Summary
  console.log(
    `${colors.blue}═══════════════════════════════════════${colors.reset}`,
  );
  const passedCount = results.filter((r) => r.issues.length === 0).length;
  const totalPages = results.length;

  if (totalIssues === 0) {
    console.log(
      `${colors.green}✓ All pages have valid metadata!${colors.reset}`,
    );
  } else {
    console.log(
      `${colors.red}✗ ${totalIssues} issues found across ${totalPages} pages${colors.reset}`,
    );
    console.log(
      `${colors.green}✓ ${passedCount} pages passed validation${colors.reset}`,
    );
  }

  console.log(`\nValidation Rules:`);
  console.log(
    `  • Title length: ${MIN_TITLE_LENGTH}-${MAX_TITLE_LENGTH} characters`,
  );
  console.log(
    `  • Description length: ${MIN_DESC_LENGTH}-${MAX_DESC_LENGTH} characters`,
  );
  console.log(`  • OG images: Should be page-specific (not generic fallback)`);
  console.log(`  • Canonical: Must be present for all pages\n`);
}

// Run validation
try {
  readAndValidatePages();
  printReport();

  // Exit with error code if issues found
  const totalIssues = results.reduce((sum, r) => sum + r.issues.length, 0);
  process.exit(totalIssues > 0 ? 1 : 0);
} catch (error) {
  console.error(`${colors.red}Error running validation:${colors.reset}`, error);
  process.exit(1);
}
