const rimraf = require('rimraf');
const fs = require('fs');
const path = require('path');
const colors = require('colors');

function deleteDir(p) {
  return new Promise((resolve) => {
    rimraf(p, {}, resolve);
  });
}

function isDir(p) {
  try {
    const stats = fs.statSync(p);
    return stats.isDirectory();
  } catch (e) {
    return false;
  }
}

async function deleteNodeModules(p, deep) {
  const files = await fs.promises.readdir(p);
  for (const f of files) {
    const np = path.resolve(p, f);

    if (!isDir(np) || f.startsWith('.')) continue;

    if (f === 'node_modules') {
      console.log(colors.yellow(`${'🗑️'} Deleting: ${np}`));
      await deleteDir(np).catch(() => {});
    } else if (deep) {
      await deleteNodeModules(np, deep);
    }
  }
}

module.exports = {
  deleteDir,
  isDir,
  deleteNodeModules,
};