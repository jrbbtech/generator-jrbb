const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.composeWith(require.resolve('../codestyle'));

    this.fs.copyTpl(
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copyTpl(
      this.templatePath('tslint.json'),
      this.destinationPath('tslint.json')
    );

    this.fs.copyTpl(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );

    this.fs.copyTpl(
      this.templatePath('tsconfig.opt.json'),
      this.destinationPath('tsconfig.opt.json')
    );

    this.fs.copyTpl(
      this.templatePath('jest.config.js'),
      this.destinationPath('jest.config.js')
    );

    try {
      const pkgConfig = require(this.destinationPath('package.json'));

      pkgConfig.scripts = pkgConfig.scripts || {};
      pkgConfig.scripts['build'] =
        'rm -rf build && amplify codegen && tsc && npm run build:opt';
      pkgConfig.scripts['build:opt'] =
        'rm -rf amplify/backend/function/<layerName>/opt/* && tsc -p tsconfig.opt.json';
      pkgConfig.scripts['test'] = 'jest';
      pkgConfig.scripts['test:watch'] = 'jest --watch';
      pkgConfig.scripts['lint'] = 'tslint -c tslint.json -p tsconfig.json';
      pkgConfig.scripts['lint:fix'] =
        'tslint -c tslint.json -p tsconfig.json --fix';

      this.fs.writeJSON(this.destinationPath('package.json'), pkgConfig);
    } catch (e) {
      console.error(e);
      console.info('Do you have a package.json?');
    }
  }

  install() {
    this.npmInstall(
      [
        '@types/jest',
        'jest',
        'ts-jest',
        'tslint',
        'tslint-config-prettier',
        'tslint-plugin-prettier',
        'typescript',
      ],
      {
        'save-dev': true,
      }
    );
  }

  end() {
    console.info(`
  ***************************************************************

  1) Create a new lambda layer function
  2) Replace <layerName> in package.json with shared lambda layer name
  3) Replace <layerName> in tsconfig.opt.json with shared lambda layer name

  ***************************************************************
    `);
  }
};
