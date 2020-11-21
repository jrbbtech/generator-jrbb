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
      this.templatePath('Dockerfile'),
      this.destinationPath('Dockerfile')
    );

    this.fs.copyTpl(
      this.templatePath('_dockerignore'),
      this.destinationPath('.dockerignore')
    );

    try {
      const pkgConfig = require(this.destinationPath('package.json'));

      pkgConfig.scripts = pkgConfig.scripts || {};
      pkgConfig.scripts['build'] = 'tsc';
      pkgConfig.scripts['start'] = 'node build/index.js';
      pkgConfig.scripts['dev'] =
        'cross-env NODE_OPTIONS=--enable-source-maps NODE_ENV=dev nodemon -w index.ts -w src/ -x "tsc && npm run start" -V -e ts';
      pkgConfig.scripts['test'] = 'jest';
      pkgConfig.scripts['test:watch'] = 'jest --watch';
      pkgConfig.scripts['lint'] = 'tslint -c tslint.json -p tsconfig.json';
      pkgConfig.scripts['lint:fix'] =
        'tslint -c tslint.json -p tsconfig.json --fix';
      pkgConfig.jest = {
        preset: 'ts-jest',
        roots: ['<rootDir>/test'],
        testEnvironment: 'node',
        testMatch: ['**/*.test.ts'],
        transform: {
          '^.+\\.tsx?$': 'ts-jest',
        },
      };

      this.fs.writeJSON(this.destinationPath('package.json'), pkgConfig);
    } catch (e) {
      console.error(e);
      console.info('Do you have a package.json?');
    }
  }

  install() {
    this.npmInstall([
      'axios',
      'env-var',
      'koa',
      'koa-bodyparser',
      'koa-router',
      'uuid',
    ]);

    this.npmInstall(
      [
        '@types/axios',
        '@types/jest',
        '@types/koa',
        '@types/koa-bodyparser',
        '@types/koa-router',
        '@types/uuid',
        'cross-env',
        'jest',
        'nodemon',
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
