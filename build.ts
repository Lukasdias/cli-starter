#!/usr/bin/env bun

import { $ } from 'bun';

async function build() {
  console.log('Building {{PROJECT_NAME}}...');

  const result = await Bun.build({
    entrypoints: ['./src/cli.ts'],
    outdir: './dist',
    target: 'bun',
    minify: true,
    splitting: false,
    sourcemap: 'external',
  });

  if (!result.success) {
    console.error('Build failed:');
    for (const log of result.logs) {
      console.error(log);
    }
    process.exit(1);
  }

  await $`chmod +x ./dist/cli.js`;
  console.log('Build complete');
}

build().catch(console.error);
