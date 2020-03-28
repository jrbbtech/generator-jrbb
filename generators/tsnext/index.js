const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.composeWith(require.resolve('../codestyle'), { react: true });
    this.composeWith(require.resolve('../stylelint'), { react: true });
  }

  install() {
    this.npmInstall(['@types/node', '@types/react', 'sass', 'typescript']);
  }
};
