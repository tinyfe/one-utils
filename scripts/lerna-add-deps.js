/*
 * @Author: Rainy [https://github.com/rain120]
 * @Date: 2020-12-05 20:27:25
 * @LastEditors: Rainy
 * @LastEditTime: 2020-12-06 10:27:35
 */

const commander = require('commander');
const prompts = require('prompts');
const shell = require('shelljs');

const ADD_PARAMS = {
  // Add the new package to devDependencies instead of dependencies
  dev: false,
  // Add the new package to peerDependencies instead of dependencies
  peer: false,
  // Skip the chained lerna bootstrap
  noBootstrap: false,
  // Add the new package with an exact version (e.g., 1.0.1) rather than the default ^ semver range (e.g., ^1.0.1)
  exact: false,
  // Use a custom registry to install the targeted package
  registry: '',
};

const ADD_PARAMS_KEYS = Object.keys(ADD_PARAMS);

function add(dep, target, opts) {
  const options = Object.assign(ADD_PARAMS, opts);
  let cmd = `lerna add ${dep} ${target}`;
  switch (options) {
    case 'dev':
      cmd += ' --dev';
      break;
    case 'peer':
      cmd += ' --peer';
      break;
    case 'noBootstrap':
      cmd += ' --no-bootstrap';
      break;
    case 'exact':
      cmd += ' --exact';
      break;
    case 'registry':
      cmd += ` --registry ${registry}`;
      break;
  }

  shell.exec(cmd);
}

function addDependencies(dependencies, target, options) {
  dependencies.forEach(dep => {
    target = target.split(',').join(' ');
    add(dep, target, options);
  });

  shell.exec('lerna bootstrap --hoist');
}

commander
  .version('v1.0.0')
  .description('<Lerna add more Dependencies to more scope>')
  .arguments('[Dependencies...]')
  .option('-t, --target <target>')
  .option('-r, --registry <url>', ' Use a custom registry to install the targeted package')
  .option('--dev', 'Add the new package to devDependencies instead of dependencies')
  .option('--peer', 'Add the new package to peerDependencies instead of dependencies')
  .option(
    '--exact',
    'Add the new package with an exact version (e.g., 1.0.1) rather than the default ^ semver range (e.g., ^1.0.1)',
  )
  .option('--no-bootstrap', 'Skip the chained lerna bootstrap')
  .action(async (deps, cmd) => {
    const questions = [
      {
        type: deps.length ? null : 'list',
        name: 'dependencies',
        message: [
          'Enter package names to be added as dependencies, separated by `,`',
          'e.g `react, react-dom`',
          'Note: Not only there packages',
        ].join('\n'),
        initial: '',
        separator: ',',
        validate: input => !!input.length || 'dependencies is required',
      },
      {
        type: cmd.target ? null : 'text',
        name: 'target',
        message: [
          'Enter dependencies target, separated by `,`',
          'e.g `libs/ajax`',
          'Note: target only can be one pkg.',
        ].join('\n'),
        separator: ',',
        validate: input => !!input || 'target is required',
      },
    ];

    const options = {};
    Object.keys(cmd).forEach(key => {
      if (ADD_PARAMS_KEYS.includes(key)) {
        options[key] = cmd[key];
      }
    });

    const { dependencies, target } = {
      dependencies: deps,
      target: cmd.target,
      ...(await prompts(questions)),
    };
    addDependencies(dependencies, target, options);
  })
  .parse(process.argv);
