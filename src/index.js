const inquirer = require('inquirer');
const colors = require('colors');

const { deleteNodeModules } = require('./utils');

(async () => {
  
  const { deep } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'deep',
      message: 'Should I delete nested node_modules inside this folder?'
    }
  ]);

  await deleteNodeModules(process.cwd(), deep);

  console.log(colors.green(`✅ Successfully deleted all node_modules inside this folder`));
})();