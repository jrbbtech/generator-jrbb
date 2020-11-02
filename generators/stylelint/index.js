const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.composeWith(require.resolve('../codestyle'), {
      react: this.options.react,
    });

    this.fs.copyTpl(
      this.templatePath('_stylelintrc.json'),
      this.destinationPath('.stylelintrc.json')
    );

    try {
      const pkgConfig = require(this.destinationPath('package.json'));

      pkgConfig.scripts = pkgConfig.scripts || {};
      pkgConfig.scripts['stylelint'] = 'stylelint "**/*.{css,sass,scss}"';
      pkgConfig.scripts['stylelint:fix'] =
        'stylelint "**/*.{css,sass,scss}" --fix';

      this.fs.writeJSON(this.destinationPath('package.json'), pkgConfig);
    } catch (e) {
      console.error(e);
      console.info('Do you have a package.json?');
    }
  }

  install() {
    this.npmInstall(
      [
        'stylelint',
        'stylelint-a11y',
        'stylelint-config-prettier',
        'stylelint-prettier',
        'stylelint-scss',
      ],
      {
        'save-dev': !this.options.react,
      }
    );
  }
};
