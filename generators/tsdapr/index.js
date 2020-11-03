const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.composeWith(require.resolve('../tsserver'));

    this.fs.copyTpl(
      this.templatePath('pubsub.yaml'),
      this.destinationPath('components/pubsub.yaml')
    );

    this.fs.copyTpl(
      this.templatePath('state.yaml'),
      this.destinationPath('components/state.yaml')
    );

    this.fs.copyTpl(
      this.templatePath('subscription.yaml'),
      this.destinationPath('components/subscription.yaml')
    );

    try {
      const pkgConfig = require(this.destinationPath('package.json'));

      this.fs.copyTpl(
        this.templatePath('index.ts'),
        this.destinationPath('index.ts'),
        { name: pkgConfig.name }
      );

      pkgConfig.scripts = pkgConfig.scripts || {};
      pkgConfig.scripts.dapr = `dapr run --app-id ${pkgConfig.name} --app-port 3000 --app-protocol http --components-path ./components npm run dev`;

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
    ]);

    this.npmInstall(
      [
        '@types/axios',
        '@types/koa',
        '@types/koa-bodyparser',
        '@types/koa-router',
      ],
      {
        'save-dev': true,
      }
    );
  }
};
