import { stub } from 'sinon';
import proxyquire from 'proxyquire';
import test from 'tape';

test('#shouldRender', t => {
  const toFn = stub();
  toFn.returns(_ => _);

  const shouldRender = proxyquire.noCallThru()('../should-render', {
    './to-fn/index': toFn
  }).default;

  const PROPS = 'PROPS';
  const WHEN = 'WHEN';

  t.equals(shouldRender(WHEN, PROPS), PROPS);
  t.end();
});
