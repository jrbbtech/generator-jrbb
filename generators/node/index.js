const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.composeWith(require.resolve('../codestyle'));

    this.fs.copyTpl(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copyTpl(
      this.templatePath('_eslintrc.json'),
      this.destinationPath('.eslintrc.json')
    );

    try {
      const pkgConfig = require(this.destinationPath('package.json'));

      pkgConfig.scripts = pkgConfig.scripts || {};
      pkgConfig.scripts['start'] = `node ${pkgConfig.main || 'src/app.js'}`;
      pkgConfig.scripts['test'] = 'jest';
      pkgConfig.scripts['test:watch'] = 'jest --watch';
      pkgConfig.scripts['lint'] = 'eslint --ext js,jsx .';
      pkgConfig.scripts['lint:fix'] = 'eslint . --ext js,jsx --fix';

      this.fs.writeJSON(this.destinationPath('package.json'), pkgConfig);
    } catch (e) {
      console.error(e);
      console.info('Do you have a package.json?');
    }
  }

  install() {
    this.npmInstall(
      [
        'jest',
        'eslint',
        'eslint-config-prettier',
        'eslint-plugin-prettier',
        'babel-eslint',
      ],
      {
        'save-dev': true,
      }
    );
  }
};
