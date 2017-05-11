<TOC 3>

### Inspiration

A month or so ago, I was writing a little [Elm](http://elm-lang.org/) project
([here](https://owen.cafe/iota)) that allows lots of people to draw on a website
at the same time, in a way that their drawings interfered with each other and
annoyed everyone. Taking a look at the generated code, I saw this:

```
function F9(fun) {
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
      return function(g) { return function(h) { return function(i) {
        return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  }
  wrapper.arity = 9;
  wrapper.func = fun;
  return wrapper;
}
```

As you can see, this function is called F9, and yes, there are similar
functions labelled F2-F8, with less inner functions. The purpose of this thing
is to curry a function with arity nine (arity is the amount of parameters a
function takes). Alright, they've defined a function for every arity up to nine
(maybe it would generate more if you wrote a function that takes more
parameters? Don't know, didn't check), I think that at the very least we can
make a single function that curries however many parameters you want.

### Prerequisites

We'll need a good understanding of these things:

* [Function.prototype.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
* [Function.prototype.bind()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind)
* [Array.prototype.reduce()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
* [Array.prototype.concat()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
* [Arguments object](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/arguments)
* [Array.prototype.slice()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/arguments)
* [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
* [Lexical scoping](https://developer.mozilla.org/en/docs/Web/JavaScript/Closures#Lexical_scoping)

### Background

Okay, currying, if you're familiar with a functional language, you might
recognize this kind of code:

```
add a b = a + b
addOne = add 1
addTwo = add 2
addOne 5             // 6
addTwo 5             // 7
```

Let's take a look at what that looks like in javascript:

```
function add(a, b) {return a + b;}
var addOne = add.bind(null, 1);
var addTwo = add.bind(null, 2);
addOne(5)            // 6
addTwo(5)            // 7
```

Huh, well that's quite doable, but not very ergonomic, let's see what we can do.

### Objective

Our goal today is to get the syntax of currying down as close as possible to
that of the unnamed functional language above, within the limits of es5, with
as small a function as possible, hopefully capable of currying functions of any
arity. We'll aim to get down to something like this:

```
var add = curry(function(a, b) {return a + b;})
var addOne = add(1);
var addTwo = add(2);
```

The above is achieved in Elm by having very nested functions such as F9.

### Initial Attempt

Okay, my first thought was to encapsulate an array, then use `apply()` to turn
that array into parameters. This looked something like this:

```
function curry(arity, func) {
  var params = [];
  function more() {
    params = params.concat([].slice.call(arguments));
    if (arity === params.length) {return func.apply(null, params);}
    return more;
  }
  return more;
}
```

Okay, here, we're using javascript's scoping rules to encapsulate an array of
parameters. `[].slice.call(arguments)` is a nice little trick to convert a
functions' arguments into an array, by fooling an array literal's `.slice()`
function into thinking arguments is already an array. There is, however, a flaw
in this plan, I'll give you an example of it failing and you can try to figure
it out.

```
var add = curry(2, function(a, b) {return a + b;});
var addOne = add(1);
var addTwo = add(2);
addOne(5); // 6
addTwo(7); // error, this is not a function
```

Woops! When you curry one parameter, you curry it for every subsequent call.
addOne was correct, however addTwo was just the value three, so we were trying
to call three as a function. Maybe we can pass the accumulated parameters in by
binding them...

```
function curry(arity, func) {
  function more() {
    var params = [].slice.call(arguments);
    if (params.length === arity)
      return func.apply(null, params);
    else return params.reduce(function(acc, val) {
      return acc.bind(null, val);
    }, more);
  }
  return more;
}
```

One of the neat things about this version is that, as it curries any function,
and it itself takes two parameters, it can curry itself!

```
// curry curries itself
var c = curry(2, curry);
function add(a, b) {return a + b;}
var addOne = c(2)(add);
```

That does what we want, however I think we can get the code size down a bit,
also, I don't like that arity parameter. I shopped around a bit, and found out
that functions have a `.length` property, which just tells you the arity.
Hooray! The curry currying itself trick will be missed, though. Okay, as to the
binding, reducing the function to bind one parameter at a time is, unnecessary,
as `.bind()` accepts multiple parameters anyway. We can apply everything to the
`.bind()` at once, methinks.  

### Final Version

```
function curry(func) {
  return (function more() {
    var params = [].slice.call(arguments);
    return ((params.length === func.length) ?
      func.apply(null, params) :
      more.bind.apply(more, [null].concat(params)));
  });
}
```

Yes! If you understood what's going on up to here, you're a hella-rad
meta-programmer. Shall we put this thing through it's paces?

```
var add = curry(function(a, b, c) {return a + b + c;});

addOne = add(1);
addOneTwo = addOne(2);
addOneTwo(3);         // 6
add(1)(2)(3);         // 6
```

Oh, also, we can still use standard javascript syntax on our curried functions,
which is a very nice bonus

```
add(1, 2, 3);         // 6
```

Right on! We're done, and it's amazing. We should probably give this a
fancy-ass name, how about 'hybrid currying'? That sounds like a thing that
vaguely describes what we've done, what with the different syntaxes and all.
I've put this on GitHub, [here](https://github.com/414owen/js-hybrid-currying).
Feel free to make a pull request or whatnot :)
