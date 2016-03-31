import BLACKLIST from './blacklist';
import empty from './empty';

export default function toFn(code='', ...args) {
  return BLACKLIST.test(code) ? empty : new Function(args, `return ${code};`);
}
