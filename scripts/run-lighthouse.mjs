import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';

const isWindows = process.platform === 'win32';
const astroBin = fileURLToPath(new URL(`../node_modules/.bin/astro${isWindows ? '.cmd' : ''}`, import.meta.url));
const lighthouseBin = fileURLToPath(new URL(`../node_modules/.bin/lighthouse${isWindows ? '.cmd' : ''}`, import.meta.url));
const reportPath = fileURLToPath(new URL('../lighthouse-report.json', import.meta.url));
const previewPort = process.env.LIGHTHOUSE_PORT ? Number.parseInt(process.env.LIGHTHOUSE_PORT, 10) : 4325;
const previewHost = '127.0.0.1';

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', ...options });
    child.on('error', reject);
    child.on('close', (code, signal) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} exited with code ${code ?? `signal ${signal}`}`));
      }
    });
  });
}

async function waitForServer(url, attempts = 40, interval = 250) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, { method: 'GET' });
      if (response.ok || response.status === 404) {
        return;
      }
    } catch (error) {
      // swallow errors while waiting
    }
    await delay(interval);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function runLighthouse() {
  await runCommand(astroBin, ['build']);

  const previewArgs = ['preview', '--host', previewHost, '--port', String(previewPort)];
  const preview = spawn(astroBin, previewArgs, { stdio: 'inherit' });

  const cleanup = () => {
    if (!preview.killed) {
      preview.kill('SIGINT');
    }
  };

  process.on('SIGINT', () => {
    cleanup();
    process.exit(1);
  });

  try {
    await waitForServer(`http://${previewHost}:${previewPort}`);

    const lighthouseArgs = [
      `http://${previewHost}:${previewPort}/`,
      '--output=json',
      `--output-path=${reportPath}`,
      '--quiet',
      '--chrome-flags=--headless --no-sandbox'
    ];

    await runCommand(lighthouseBin, lighthouseArgs);

    const reportRaw = await readFile(reportPath, 'utf-8');
    const report = JSON.parse(reportRaw);
    const categories = report.categories ?? {};
    const audits = report.audits ?? {};

    console.log('\nLighthouse scores:');
    for (const [key, value] of Object.entries(categories)) {
      const score = typeof value.score === 'number' ? Math.round(value.score * 100) : 'n/a';
      console.log(`  ${value.title ?? key}: ${score}`);
    }

    // Performance metrics breakdown
    const performanceMetrics = [
      { id: 'first-contentful-paint', name: 'FCP', weight: 10 },
      { id: 'largest-contentful-paint', name: 'LCP', weight: 25 },
      { id: 'total-blocking-time', name: 'TBT', weight: 30 },
      { id: 'cumulative-layout-shift', name: 'CLS', weight: 25 },
      { id: 'speed-index', name: 'SI', weight: 10 },
    ];

    const metricsWithScores = performanceMetrics.map(metric => {
      const audit = audits[metric.id];
      return {
        ...metric,
        score: audit?.score ?? null,
        displayValue: audit?.displayValue ?? 'n/a',
      };
    }).filter(m => m.score !== null);

    // Sort by score (lowest first - these are the problem areas)
    metricsWithScores.sort((a, b) => a.score - b.score);

    console.log('\nPerformance breakdown (sorted by score, lowest first):');
    console.log('  ┌──────┬───────┬────────────┬────────────────────────────┐');
    console.log('  │ Name │ Score │ Weight     │ Value                      │');
    console.log('  ├──────┼───────┼────────────┼────────────────────────────┤');
    for (const metric of metricsWithScores) {
      const scoreNum = Math.round(metric.score * 100);
      const scoreStr = String(scoreNum).padStart(3);
      const weightStr = `${metric.weight}%`.padStart(4);
      const nameStr = metric.name.padEnd(4);
      const valueStr = metric.displayValue.padEnd(26);
      const indicator = scoreNum < 90 ? '⚠️ ' : scoreNum === 100 ? '✅' : '  ';
      console.log(`  │ ${nameStr} │ ${scoreStr}   │ ${weightStr}       │ ${valueStr} │ ${indicator}`);
    }
    console.log('  └──────┴───────┴────────────┴────────────────────────────┘');

    // Identify primary driver for improvement
    const worstMetric = metricsWithScores[0];
    if (worstMetric && worstMetric.score < 1) {
      console.log(`\n🎯 Primary improvement target: ${worstMetric.name} (score: ${Math.round(worstMetric.score * 100)}, weight: ${worstMetric.weight}%)`);
      
      // Add specific guidance based on the worst metric
      if (worstMetric.id === 'largest-contentful-paint') {
        const renderBlocking = audits['render-blocking-resources']?.details?.items ?? [];
        if (renderBlocking.length > 0) {
          console.log('   └─ Render-blocking resources:');
          for (const item of renderBlocking.slice(0, 3)) {
            const url = item.url?.split('/').pop() ?? item.url;
            const wasted = item.wastedMs ? `${item.wastedMs}ms` : '';
            console.log(`      • ${url} ${wasted}`);
          }
        }
      } else if (worstMetric.id === 'speed-index') {
        console.log('   └─ Optimize visual completeness: reduce render-blocking resources, defer non-critical CSS');
      } else if (worstMetric.id === 'first-contentful-paint') {
        console.log('   └─ Reduce time to first paint: inline critical CSS, preload key resources');
      } else if (worstMetric.id === 'total-blocking-time') {
        console.log('   └─ Reduce JavaScript execution time: code-split, defer non-critical scripts');
      } else if (worstMetric.id === 'cumulative-layout-shift') {
        console.log('   └─ Prevent layout shifts: set explicit dimensions on images/embeds');
      }
    }
  } finally {
    cleanup();
  }
}

runLighthouse().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
