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

  t.ok(BLACKLIST.test("(props.moreStuff ? 'blah' : 'bloh')"), "(props.moreStuff ? 'blah' : 'bloh'");
  t.ok(BLACKLIST.test('props.stuff=10'), 'props.stuff=10');
  t.ok(BLACKLIST.test('props.stuff = 10'), 'props.stuff = 10');
  t.ok(BLACKLIST.test('typeof props.stuff === "undefined"'), 'typeof props.stuff === "undefined"');
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

  t.end();
});
