import * as cdk from '@aws-cdk/core';
import { <%= pascalName %>Stack } from './src/<%= name %>-stack';

const app = new cdk.App();
new <%= pascalName %>Stack(app, '<%= pascalName %>');
