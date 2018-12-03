/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../src');
const LIB_DIR = path.join(__dirname, '../lib');
const IGNORE = [/__tests__/];

console.log('Migrating flow files...');
const relPaths = fs.readdirSync(SRC_DIR);
while (relPaths.length > 0) {
  const next = relPaths.pop();

  if (IGNORE.some(regex => regex.test(next))) {
    continue;
  }

  const srcNext = path.join(SRC_DIR, next);

  // Process paths recursively.
  if (fs.statSync(srcNext).isDirectory()) {
    const newRelPaths = fs
      .readdirSync(srcNext)
      .map(rel => path.join(next, rel));
    relPaths.push.apply(relPaths, newRelPaths);
  } else if (/\.js(x)?$/.test(next)) {
    // TODO: This is a js file, assuming this has flow definitions and copying
    // it over. In the future, may want to think about reading the file and
    // checking if there is a @flow annotation in the file.
    const libNextWithFlow = path.join(LIB_DIR, `${next}.flow`);
    fs.writeFileSync(libNextWithFlow, fs.readFileSync(srcNext));
  }
}

console.log('Done Generating Flow Files');
process.exit(0);
