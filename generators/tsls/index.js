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

      const pascalName = pkgConfig.name
        .replace(/[-_]/g, ' ')
        .replace(/\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase())
        .replace(/\s/g, '');

      this.fs.copyTpl(
        this.templatePath('aws/named-stack.ts'),
        this.destinationPath(`aws/${pkgConfig.name}-stack.ts`),
        {
          pascalName,
        }
      );

      this.fs.copyTpl(
        this.templatePath('aws/named.ts'),
        this.destinationPath(`aws/${pkgConfig.name}.ts`),
        {
          pascalName,
          name: pkgConfig.name,
        }
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
      pkgConfig.bin[pkgConfig.name] = `build/aws/${pkConfig.name}.js`;
      pkgConfig.scripts['cdk'] = 'cdk';

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
        'aws-ckd',
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
};
