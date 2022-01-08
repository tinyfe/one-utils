import chalk from 'chalk';
import { spawn } from 'child_process';

export interface InstallArgs {
  useYarn?: boolean;
  isOnline?: boolean;
  devDependencies?: boolean;
}

export function install(
  root: string,
  dependencies: string[] | null = null,
  { useYarn, isOnline, devDependencies }: InstallArgs,
): Promise<void> {
  // flags
  let npmFlags: string[] = [];
  let yarnFlags: string[] = [];

  return new Promise((resolve, reject) => {
    let command = useYarn ? 'yarnpkg' : 'npm';
    let args: string[] = [];

    if (dependencies && dependencies.length) {
      if (useYarn) {
        args = ['add', '--exact'];

        if (!isOnline) {
          args.push('--offline');
        }

        args.push('--cwd', root);

        if (devDependencies) {
          args.push('--dev');
        }

        args.push(...dependencies);
      } else {
        args = ['install'];

        if (useYarn) {
          if (!isOnline) {
            console.log(chalk.yellow('You appear to be offline.'));
            console.log(chalk.yellow('Falling back to the local Yarn cache.'));
            console.log();
            args.push('--offline');
          }
        } else {
          if (!isOnline) {
            console.log(chalk.yellow('You appear to be offline.'));
            console.log();
          }
        }
      }
    }

    useYarn ? args.push(...yarnFlags) : args.push(...npmFlags);

    const child = spawn(command, args, {
      stdio: 'inherit',
      env: { ...process.env, ADBLOCK: '1', DISABLE_OPENCOLLECTIVE: '1' },
    });

    child.on('close', (status: number) => {
      if (status !== 0) {
        reject({ command: `${command} ${args.join(' ')}` });

        return;
      }

      resolve();
    });
  });
}
