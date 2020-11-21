# JRBB Technology project dotfiles and configuration generators

## Install

```bash
npm install -g yo @jrbbtech/generator-setup
```

## Generators

### React with typescript

Generates dotfiles and config for a Create React App typescript project

```bash
yo @jrbbtech/setup:tsreact
```

### NodeJS with typescript

Generates dotfiles and config for a typescript node project

```bash
yo @jrbbtech/setup:tsnode
```

### NodeJS server with typescript

Generates Dockerfile, dotfiles, and config for a typescript node server project

```bash
yo @jrbbtech/setup:tsserver
```

### NodeJS server with typescript with Dapr backend

Generates boilerplate server, Dockerfile, dotfiles, and config for a typescript
node server project running on Dapr backend

Requires Docker and Dapr to run.

```bash
yo @jrbbtech/setup:tsdapr
npm run dapr # optional
```

### AWS CDK with typescript

Generates boilerplate, dotfiles, and config for a typescript
AWS CDK typescript project.

```bash
yo @jrbbtech/setup:tsls
```

## License

[MIT License](./LICENSE)
