const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.composeWith(require.resolve('../codestyle'));

    try {
      const pkgConfig = require(this.destinationPath('package.json'));
      console.log(pkgConfig);

      this.fs.copyTpl(
        this.templatePath('_gitignore'),
        this.destinationPath('.gitignore')
      );

      this.fs.copyTpl(
        this.templatePath('tslint.json'),
        this.destinationPath('tslint.json')
      );

      this.fs.delete('handler.js');
      this.fs.copyTpl(
        this.templatePath('handler.ts'),
        this.destinationPath('handler.ts')
      );

      this.fs.copyTpl(
        this.templatePath('serverless.yml'),
        this.destinationPath('serverless.yml'),
        { name: pkgConfig.name }
      );

      pkgConfig.scripts = pkgConfig.scripts || {};
      pkgConfig.scripts['build'] = 'tsc';
      pkgConfig.scripts['build:watch'] = 'tsc --watch';
      pkgConfig.scripts['test'] = 'jest';
      pkgConfig.scripts['test:watch'] = 'jest --watch';
      pkgConfig.scripts['lint'] = 'tslint -c tslint.json -p tsconfig.json';
      pkgConfig.scripts['lint:fix'] =
        'tslint -c tslint.json -p tsconfig.json --fix';
      pkgConfig.jest = {
        preset: 'ts-jest',
        testEnvironment: 'node',
        transform: {
          '^.+\\.(ts|tsx)?$': 'ts-jest',
        },
      };

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
        'serverless-dynamodb-local',
        'serverless-offline',
        'serverless-plugin-typescript',
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
};
