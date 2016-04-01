import test from 'tape';
import BLACKLIST from '../blacklist';

test('BLACKLIST', t => {
  t.notOk(BLACKLIST.test('props.stuff'), 'props.stuff');
  t.notOk(BLACKLIST.test('!props.stuff'), '!props.stuff');
  t.notOk(BLACKLIST.test('!!props.stuff'), '!!props.stuff');

  t.notOk(BLACKLIST.test('props.stuff > 10'), 'props.stuff > 10');
  t.notOk(BLACKLIST.test('props.stuff >= 10'), 'props.stuff >= 10');
  t.notOk(BLACKLIST.test('props.stuff =< 10'), 'props.stuff =< 10');
  t.notOk(BLACKLIST.test('props.stuff == 10'), 'props.stuff == 10');
  t.notOk(BLACKLIST.test('props.stuff === 10'), 'props.stuff === 10');
  t.notOk(BLACKLIST.test('props.stuff > 10 && props.moreStuff === "blah"'), 'props.stuff > 10 && props.moreStuff === "blah"');

  t.notOk(BLACKLIST.test("props.moreStuff == 'blah'"), "props.moreStuff == 'blah'");
  t.notOk(BLACKLIST.test("props.moreStuff ? 'blah' : 'bloh'"), "props.moreStuff ? 'blah' : 'bloh'");
  t.notOk(BLACKLIST.test('typeof props.stuff === "undefined"'), 'typeof props.stuff === "undefined"');
  t.notOk(BLACKLIST.test('props.stuff instanceof Stuff'), 'props.stuff instanceof Stuff');

  t.ok(BLACKLIST.test("(props.moreStuff ? 'blah' : 'bloh')"), "(props.moreStuff ? 'blah' : 'bloh'");
  t.ok(BLACKLIST.test('props.stuff=10'), 'props.stuff=10');
  t.ok(BLACKLIST.test('props.stuff = 10'), 'props.stuff = 10');
  t.ok(BLACKLIST.test('window.thing'), 'window.thing');
  t.ok(BLACKLIST.test('var stuff = "more"'), 'var stuff = "more"');
  t.ok(BLACKLIST.test('function() {}'), 'function() {');
  t.ok(BLACKLIST.test('something()'), 'something();');
  t.ok(BLACKLIST.test('"two"; "statements";'), '"two"; "statements"');
  t.ok(BLACKLIST.test('return "something";'), 'return "something"');
  t.ok(BLACKLIST.test('if(something)'), 'if(something)');
  t.ok(BLACKLIST.test('if (something) { } else { }'), 'if (something) { } else { }');
  t.ok(BLACKLIST.test('for (var a in something) { }'), 'for (var a in something) { }');
  t.ok(BLACKLIST.test('do { } while'), 'do { } while');

  RESERVED.forEach(r => {
    t.notOk(BLACKLIST.test(`i${r}i`), `i${r}i`);
    t.notOk(BLACKLIST.test(`${r}i`), `${r}i`);
    t.notOk(BLACKLIST.test(`i${r}`), `i${r}`);
    t.notOk(BLACKLIST.test(` ${r}i`), ` ${r}i`);
    t.notOk(BLACKLIST.test(`i${r} `), `i${r} `);
    t.ok(BLACKLIST.test(r), r);
    t.ok(BLACKLIST.test(` ${r}`), ` ${r}`);
    t.ok(BLACKLIST.test(`${r} `), `${r} `);
    t.ok(BLACKLIST.test(` ${r} `), ` ${r}`);
  });

  t.end();
});

const RESERVED = [
  'break',
  'case',
  'class',
  'catch',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'export',
  'extends',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'in',
  'new',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'try',
  'var',
  'void',
  'while',
  'with',
  'yield',
  '=>',
  'abstract',
  'boolean',
  'byte',
  'char',
  'double',
  'final',
  'float',
  'goto',
  'int',
  'long',
  'native',
  'short',
  'synchronized',
  'throws',
  'transient',
  'volatile',
  'async',
  'await',
  'implements',
  'package',
  'protected',
  'static',
  'let',
  'interface',
  'private',
  'public',
  'Boolean',
  'Number',
  'RegExp',
  'String'
];
