import test from 'ava';
// @ts-ignore
import browserEnv from 'browser-env';
import { React, init } from '../src/domdom';
import Books from '../src/views/Books';

browserEnv();

test('Yes', async t => {
  init(document.body, <Books />);
  await Promise.resolve();
  console.log(document.body.outerHTML);
  t.pass();
});
