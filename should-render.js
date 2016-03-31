import toFn from './to-fn/index';

export default function shouldRender(when, props) {
  return toFn(when, 'props')(props);
}
