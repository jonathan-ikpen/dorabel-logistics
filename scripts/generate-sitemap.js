#!/usr/bin/env node

/**
 * Dynamic Sitemap Generator for Dorabel Logistics
 * Generates sitemap.xml based on defined routes and content
 * Run: npm run generate:sitemap
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://dorabel.co.uk';
const TODAY = new Date().toISOString().split('T')[0];

// Define all routes with metadata
const ROUTES = [
  {
    path: '/',
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: TODAY,
  },
  {
    path: '/services',
    changefreq: 'monthly',
    priority: '0.9',
    lastmod: TODAY,
  },
  {
    path: '/about',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: TODAY,
  },
  {
    path: '/contact',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: TODAY,
  },
  {
    path: '/booking',
    changefreq: 'monthly',
    priority: '0.9',
    lastmod: TODAY,
  },
  {
    path: '/leave-review',
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: TODAY,
  },
];

/**
 * Generate XML for sitemap
 */
function generateSitemapXML() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  ROUTES.forEach((route) => {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}${route.path}</loc>\n`;
    xml += `    <lastmod>${route.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += '</urlset>\n';
  return xml;
}

/**
 * Generate sitemap
 */
function generateSitemap() {
  try {
    const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    const sitemapContent = generateSitemapXML();

    fs.writeFileSync(sitemapPath, sitemapContent, 'utf-8');
    console.log(`✓ Sitemap generated at ${sitemapPath}`);
    console.log(`✓ Total routes: ${ROUTES.length}`);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run generator
generateSitemap();
