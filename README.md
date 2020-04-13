# JRBB Technology "Setup" generators

Generators to setup projects for node, typescript, and frontend frameworks
such as React with organizations formatting and linting rules.

## Install

```bash
npm install -g yo @jrbbtech/generator-setup
```

## (s)css fontsize

```css
html {
  font-size: 62.5%;
}

body {
  font-size: 14px;
  font-size: 1.4rem;
} /* =14px */

html,
body {
  margin: 0;
  padding: 0;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}
```

## Generators

### codestyle

All generators include the codestyle generator which adds .prettierrc.json,
.prettierignore, and .editoconfig files to the project.

### NodeJS

Installs jest and eslint with prettier config & plugin with es6 support.

```bash
yo @jrbbtech/setup:node
```

### NodeJS with typescript

Installs jest, typescript, and tslint with prettier config & plugin.

```bash
yo @jrbbtech/setup:tsnode
```

### (s)css stylelint

Install stylelint with a11y and prettier config and plugin with scss support.

```bash
yo @jrbbtech/setup:stylelint
```

### React

Installs sass support and runs the stylelint generator (and codestyle).

```bash
yo @jrbbtech/setup:react
```

### React with typescript

Installs sass support and runs the stylelint generator (and codestyle) and adds
Typescript as per the documentation for [Create React App](https://create-react-app.dev/docs/adding-typescript).

```bash
yo @jrbbtech/setup:tsreact
```

Starting the Create React App afterwards will generate the tsconfig.json file.

### Next

Installs sass support and runs the stylelint generator (and codestyle).

```bash
yo @jrbbtech/setup:next
```

### Next with typescript

Installs sass support and runs the stylelint generator (and codestyle) and adds
Typescript as per the documentation for [Create Next App](https://nextjs.org/docs/basic-features/typescript).

```bash
yo @jrbbtech/setup:tsnext
```

Starting the Create Next App afterwards will generate the tsconfig.json file.

## License

[MIT License](./LICENSE)
