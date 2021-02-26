const shell = require('shelljs');
const ora = require('ora');

const BUILD_PKG = process.argv[2] || 'module';
const TYPE = process.argv[3] || 'all';
const BUILD = process.argv[4] || '*';

const createArgs = (target, type) => {
  return [`rm -rf packages/${target}/lib`, `BUILD=${type} BUILD_PKG='${target}' npm run build:${TYPE}`].join(' & ');
};

function build(target = BUILD_PKG, type = BUILD.split(';')) {
  const spinner = ora().start(`build ${target}\n`);
  const result = shell.exec(createArgs(target, type));

  if (result.code !== 0) {
    spinner.fail(result.stdout);
    process.exit(1);
  } else {
    spinner.succeed(`\n${createArgs(target, type)} Succeed`);
  }

  spinner.stop();
}

build();
