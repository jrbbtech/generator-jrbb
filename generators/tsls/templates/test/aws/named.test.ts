import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle
} from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as <%= pascalName %> from '../../aws/<%= name %>-stack';

test('Empty Stack', () => {
  const app = new cdk.App();
  const stack = new <%= pascalName %>.<%= pascalName %>Stack(app, 'MyTestStack');

  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {}
      },
      MatchStyle.EXACT
    )
  );
});
