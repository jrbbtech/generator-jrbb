const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.composeWith(require.resolve('../codestyle'));

    try {
      const pkgConfig = require(this.destinationPath('package.json'));

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

      const pascalName = pkgConfig.name
        .replace(/[-_]/g, ' ')
        .replace(/\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase())
        .replace(/\s/g, '');

      this.fs.copyTpl(
        this.templatePath('src/named-stack.ts'),
        this.destinationPath(`src/${pkgConfig.name}-stack.ts`),
        {
          pascalName,
        }
      );

      this.fs.copyTpl(
        this.templatePath('app.ts'),
        this.destinationPath(`app.ts`),
        {
          pascalName,
          name: pkgConfig.name,
        }
      );

      this.fs.copyTpl(
        this.templatePath('test/named.test.ts'),
        this.destinationPath(`test/${pkgConfig.name}.test.ts`),
        {
          pascalName,
          name: pkgConfig.name,
        }
      );

      this.fs.copyTpl(
        this.templatePath('cdk.json'),
        this.destinationPath('cdk.json'),
        {
          name: pkgConfig.name,
        }
      );

      pkgConfig.scripts = pkgConfig.scripts || {};
      pkgConfig.scripts['build'] = 'tsc';
      pkgConfig.scripts['build:watch'] = 'tsc --watch';
      pkgConfig.scripts['lint'] = 'tslint -c tslint.json -p tsconfig.json';
      pkgConfig.scripts['lint:fix'] =
        'tslint -c tslint.json -p tsconfig.json --fix';
      pkgConfig.scripts['test'] = 'jest';
      pkgConfig.scripts['test:watch'] = 'jest --watch';
      pkgConfig.jest = {
        preset: 'ts-jest',
        roots: ['<rootDir>/src'],
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
    this.npmInstall(['@aws-cdk/core']);

    this.npmInstall(
      [
        '@aws-cdk/assert',
        '@types/jest',
        'aws-cdk',
        'jest',
        'ts-jest',
        'ts-node',
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
