const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.composeWith(require.resolve('../codestyle'));
    this.composeWith(require.resolve('../stylelint'));
  }

  install() {
    this.npmInstall([
      'typescript',
      '@types/node',
      '@types/react',
      '@types/react-dom',
      '@types/jest',
    ]);
  }
};
