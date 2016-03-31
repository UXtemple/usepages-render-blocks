import empty from '../empty';
import test from 'tape';

test('#empty', t => {
  t.equals(empty.toString(), 'function () {}');
  t.end();
});
