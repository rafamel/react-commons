const registerSx = (sx, _ = (global.SX = {})) =>
  Object.keys(sx).forEach((key) => (global.SX[key] = sx[key]));
const sx = (name) => `node -r ./package-scripts.js -e global.SX.${name}\\(\\)`;
const scripts = (x) => ({ scripts: x });
const exit0 = (x) => `${x} || shx echo `;
const series = (x) => `(${x.join(') && (')})`;
const intrim = (x) => x.replace(/\n/g, ' ').replace(/ {2,}/g, ' ');
const fs = require('fs');

process.env.LOG_LEVEL = 'disable';
module.exports = scripts({
  build: series([
    exit0(`shx rm -r build`),
    'cross-env NODE_ENV=production babel ./src --out-dir ./build --ignore *.test.js'
  ]),
  publish: `nps validate build && ${sx(
    'packageCp'
  )} && shx cp README.md ./build/ && cd build && npm publish --access=public && cd ../ && shx rm -r build`,
  dev: `onchange "./src/**/*.{js,jsx}" -i -- nps private.dev`,
  fix: `prettier --write "./src/**/*.{js,jsx,ts,scss,md}"`,
  lint: {
    default: series([
      `eslint ./src --ext .js`,
      'shx echo "No linting errors."'
    ]),
    md: 'markdownlint *.md --config markdown.json'
  },
  test: {
    default: 'jest --runInBand',
    watch: `onchange "./src/**/*.{js,jsx}" -i -- nps private.test_watch`
  },
  validate: series([
    'nps fix lint lint.md',
    `npm outdated || ${sx('countdown')}`
  ]),
  update: 'npm update --save/save-dev && npm outdated',
  clean: series([exit0(`shx rm -r build`), 'shx rm -rf node_modules']),
  // Private
  private: {
    dev: `babel ./src --out-dir ./build --ignore *.test.js && nps lint`,
    test_watch: `${sx('clear')} && nps lint`
  }
});

registerSx({
  clear: () => console.log('\x1Bc'),
  countdown: (i = 8) => {
    if (!process.env.MSG) return;
    console.log('');
    const t = setInterval(() => {
      process.stdout.write('\r' + process.env.MSG + ' ' + i);
      !i-- && (clearInterval(t) || true) && console.log('\n');
    }, 1000);
  },
  packageCp: () => {
    const pck = fs.readFileSync('./package.json');
    const { scripts, ...obj } = JSON.parse(pck.toString());
    fs.writeFileSync('./build/package.json', JSON.stringify(obj, null, 2));
  }
});
