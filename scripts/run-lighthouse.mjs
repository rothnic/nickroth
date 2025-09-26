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

    console.log('\nLighthouse scores:');
    for (const [key, value] of Object.entries(categories)) {
      const score = typeof value.score === 'number' ? Math.round(value.score * 100) : 'n/a';
      console.log(`  ${value.title ?? key}: ${score}`);
    }
  } finally {
    cleanup();
  }
}

runLighthouse().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
