<TOC 3>

### Objective 

Functions are variables, variables are variables, everything is a variable. In
this post, we'll see if we can get some JavaScript foo going that defines some
variables in a local scope, then makes them available in some other local
scope, and no other scope.

### We Will Need

* An open mind
* Courage in the face of [eval](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval)
* A lot of foo

### Background and Justification

Well, I write some nifty web apps. Sometimes I don't feel like using bundlers
and transpilers. Sometimes I like to fling some vanilla around. One of my
projects was called [Nutmeg](https://github.com/414owen/Nutmeg-Core), and it's
designed for people who don't want to upload a new bundle every time they want
to update their website. People who want as many scripts to be cached as
possible people who want super-tiny syntax. Nutmeg defines a bunch of
functions for creating elements, such as `div()`, `ul()`, and `span()`. What it
does is it sets `window.Nutmeg` to an object that contains these functions.
Pretty standard, it means that we can call `Nutmeg.div("Hello, World!")`
anywhere. Cool story, but I want my code to be smaller than that.

### An Improvement

One option is just to alias Nutmeg. For example:

```
window.onload = function() {
	var N = window.Nutmeg;
	N.div("Hello, World");
}
```

Okay, now all the functions are prefaced with `N.`. This is a lot better, but
two characters is a lot. You could be using the seconds racked up typing all of
your `N.`s to do useful things, like making banana smoothies, for example.

### A Bad Option

One way to transfer the variables to this scope is just to create copies of the
variables manually. This might be fine for some libraries, but Nutmeg has
functions for a bunch of HTML elements, of which there are many. We're going to
need to abstract this...

```
window.onload = function() {
	var N = window.Nutmeg;
	var br = N.br;
	var button = N.button;
	var canvas = N.canvas;
	var div = N.div;
	var h1 = N.h1;

	// Etc.

	div("Hello, World");

	// Works, but at what cost? :'(
}
```

### Research

Okay, scoping is pretty flexible in JavaScript. We can declare variables in a
for loop, for example, and they'll still be accessible when the loop ends.

```
function scopeTest() {
	for (var i = 0; i < 10; i++) {
		var innerVariable = i;
	}
	console.log(innerVariable); // Prints '9'
}
```

This feels like it's going to be useful.

Now let's have a look at how we declare variables in JavaScript. We can declare
them as items in an object.

```
var nums = {};
for (var i = 0; i < 10; i++) {
	var nums["test" + i] = i;
}
```

This is good, but it's giving our variables a little namespacing doodah.
Unfortunately there is no equivalent plain variable constructor, you can't say
`Variable.create("div", function() {/* do stuff */})` (though I would very much
like to see this feature). Instead we're going to have to generate some variable
declarations in a string and eval it.

```
function() {
	for (var key in Nutmeg) {
		eval("var " + key + " = Nutmeg[" + key + "];");
	}

	div(); // Yay, this works.
}
```

Okay, here generating a new variable declaration from the key in the Nutmeg
object, and setting it equal to the value in the Nutmeg object. For a while,
the Nutmeg readme suggested importing like this. People don't really like
pasting in three lines of code to import something nicely though. Luckily, we
can abstract some of this out.

Unfortunately, we need the eval in this scope, so the import works. Our new
code will therefore have to take the form of:

```
eval(/* abstracted import */);
```

### The Solution

How about we just iterate over the keys keys within the eval?

```
// Generate import code
function local(name) {
	return (
		"for (var key in " + name + ") {" +
			"eval(" +
				"'var ' + key + ' = " + name + "[\"' + key + '\"]'" +
			");" +
		"}"
	);
}

function() {
	eval(import("Nutmeg"));
	div(); // Hey, it still works!
}
```

Nested eval? Have you ever seen more beautiful code? Me too, however when the
`import()` function is hidden, only we will know of our shame... Along with any
curious developer.

Remember that we're generating a string representing code to run, so we're
passing in the name of the object in the current scope, not the object itself.

### Working Example

Let's test all this with a simple example:

```
let obj = {
	a: "Hello,",
	b: "World!"
};

function local(name) {
	return (
		"for (var key in " + name + ") {" +
			"eval(" +
				"'var ' + key + ' = " + name + "[\"' + key + '\"]'" +
			");" +
		"}"
	);
}

function testImport() {
	eval(local("obj"));

	console.log(a, b);
	// Woah! a and b were all declared in the scope of this function
}

testImport();
```

As usual I have created a repository for the code
[here](https://github.com/414owen/LocalScope), If you found what you've read
interesting, feel free to [contact me](contact).
