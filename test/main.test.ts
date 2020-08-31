import test from 'ava';
// @ts-ignore
import browserEnv from 'browser-env';

browserEnv();

test('Yes', async t => {
  require('../src/main');
  await Promise.resolve();
  console.log(document.body.outerHTML);
  t.pass();
});
