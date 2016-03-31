import proxyquire from 'proxyquire';
import test from 'tape';

test('#toFn', t => {
  const EMPTY = 'EMPTY';
  const INVALID = 'var stuff = "something";';
  const OK = 'props.enabled';
  const PROPS = {
    enabled: 'ENABLED'
  };

  const toFn = proxyquire.noCallThru()('../index', {
    './blacklist': {
      test: code => code !== OK
    },
    './empty': EMPTY
  }).default;

  t.equals(toFn(INVALID), EMPTY, 'if code is blacklisted, returns an empty function');

  const ok = toFn(OK, 'props');
  t.equals(typeof ok, 'function', 'returns a function');
  t.equals(ok(PROPS), PROPS.enabled, 'takes arguments and returns the evaluated expression');

  t.end();
});
