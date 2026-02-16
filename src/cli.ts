#!/usr/bin/env bun

import { Command } from 'commander';
import * as p from '@clack/prompts';
import color from 'picocolors';
import type { CLIOptions } from './types.js';

const program = new Command();

program
  .name('{{CLI_NAME}}')
  .description('{{PROJECT_DESCRIPTION}}')
  .version('0.1.0');

program
  .option('-i, --interactive', 'Run in interactive mode', false)
  .action(async (options: CLIOptions) => {
    try {
      if (options.interactive) {
        await runInteractive();
      } else {
        await runDefault();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(color.red(`Error: ${message}`));
      process.exit(1);
    }
  });

async function runInteractive(): Promise<void> {
  p.intro(color.bgCyan(color.black(' {{CLI_NAME}} ')));

  const action = await p.select({
    message: 'What would you like to do?',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
  });

  if (p.isCancel(action)) {
    p.outro(color.yellow('Cancelled'));
    process.exit(0);
  }

  const s = p.spinner();
  s.start('Processing...');

  try {
    // TODO: Implement your logic here
    await new Promise(resolve => setTimeout(resolve, 1000));
    s.stop('Done!');
    p.outro(color.green('Completed successfully'));
  } catch (error) {
    s.stop('Failed');
    const message = error instanceof Error ? error.message : String(error);
    p.outro(color.red(`Error: ${message}`));
    process.exit(1);
  }
}

async function runDefault(): Promise<void> {
  console.log(color.cyan('{{PROJECT_NAME}} v0.1.0'));
  console.log(color.gray('Run with --interactive for TUI mode'));
}

program.parse();
