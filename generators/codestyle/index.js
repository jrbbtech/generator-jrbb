const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copyTpl(
      this.templatePath('_editorconfig'),
      this.destinationPath('.editorconfig')
    );

    this.fs.copyTpl(
      this.templatePath('_prettierrc.json'),
      this.destinationPath('.prettierrc.json')
    );

    this.fs.copyTpl(
      this.templatePath('_prettierignore'),
      this.destinationPath('.prettierignore')
    );
  }

  install() {
    this.npmInstall(['prettier'], { 'save-dev': true });
  }
};
