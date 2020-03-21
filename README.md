# JRBB Technology generators

Generators to setup projects for node, typescript, and frontend frameworks
such as React.

## Install

```bash
npm install -g yo generator-jrbb
```

## codestyle

All generators include the codestyle generator which adds .prettierrc.json,
.prettierignore, and .editoconfig files to the project.

## NodeJS

Installs jest and eslint with prettier config & plugin with es6 support.

```bash
yo jrbb:node
```

## NodeJS with typescript

Installs jest, typescript, and tslint with prettier config & plugin.

```bash
yo jrbb:tsnode
```

## (s)css stylelint

Install stylelint with a11y and prettier config and plugin with scss support.

```bash
yo jrbb:stylelint
```
