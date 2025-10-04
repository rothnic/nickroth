#!/usr/bin/env node

/**
 * Check Lighthouse scores against minimum thresholds
 * Usage: node scripts/check-lighthouse-thresholds.mjs
 */

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const reportPath = fileURLToPath(new URL('../lighthouse-report.json', import.meta.url));

const THRESHOLDS = {
  performance: 90,
  accessibility: 90,
  'best-practices': 95,
  seo: 95
};

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m'
};

async function checkThresholds() {
  try {
    const reportRaw = await readFile(reportPath, 'utf-8');
    const report = JSON.parse(reportRaw);
    const categories = report.categories ?? {};

    console.log('\n📊 Lighthouse Score Thresholds Check\n');
    console.log('Category          Score    Min    Status');
    console.log('─────────────────────────────────────────');

    let allPassed = true;

    for (const [key, threshold] of Object.entries(THRESHOLDS)) {
      const category = categories[key];
      const score = category ? Math.round(category.score * 100) : 0;
      const passed = score >= threshold;
      const status = passed ? `${COLORS.green}✓ PASS${COLORS.reset}` : `${COLORS.red}✗ FAIL${COLORS.reset}`;
      const categoryName = category?.title ?? key;
      
      console.log(`${categoryName.padEnd(18)}${String(score).padStart(3)}     ${String(threshold).padStart(2)}     ${status}`);
      
      if (!passed) {
        allPassed = false;
        console.log(`  ${COLORS.yellow}→ Needs ${threshold - score} more points${COLORS.reset}`);
      }
    }

    console.log('─────────────────────────────────────────\n');

    if (allPassed) {
      console.log(`${COLORS.green}✅ All scores meet minimum thresholds!${COLORS.reset}\n`);
      process.exit(0);
    } else {
      console.log(`${COLORS.red}❌ Some scores are below minimum thresholds${COLORS.reset}\n`);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error reading Lighthouse report:', error.message);
    console.error('   Run `pnpm run audit` first to generate the report.\n');
    process.exit(1);
  }
}

checkThresholds();
