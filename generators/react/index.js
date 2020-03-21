const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.composeWith(require.resolve('../codestyle'));
    this.composeWith(require.resolve('../stylelint'));
  }
};
