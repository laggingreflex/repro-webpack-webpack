const fs = require('fs');
const { spawnSync } = require('child_process');

const exec = (cwd, cmdStr) => {
  const [cmd, ...args] = cmdStr.split(/ /g);
  console.log(`\n====\nRunning (${cwd}) ${cmdStr}\n…………`);
  const { status } = spawnSync(cmd, args, { cwd, shell: true, stdio: "inherit" });
  console.log(`====`);
  if (status) process.exit(status);
};

const mainTest = () => {
  console.log(`\n====\nRunning bundle (final test to see if it worked)\n…………`);
  delete require.cache[require.resolve('./app/dist/main')];
  require('./app/dist/main');
  console.log(`====`);
}

/* First approach, invoke Core directly */
exec('app', 'node ../core/cli');
mainTest(); /* Should work */

/* Second approach, pre-build Core, then run */
exec('core', 'npm i webpack webpack-cli');
exec('core', 'npx webpack --config meta.webpack.config.js');
exec('app', 'node ../core/dist/cli');
mainTest(); /* Doesn't work */
