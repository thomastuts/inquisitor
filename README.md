# Inquisitor

**Inquisitor extracts expressions from a Gmail-like search string.** Expression values can optionally be transformed during parsing.

It turns this:

`'age:50 name:"john doe" foo:BAR fruit:chiquita'`

into this:

```js
{
  age: 50,
  name: 'John Doe',
  foo: 'BAR',
  fruit: 'chiquita bananas'
}
```

## How does it work?
Inquisitor has two major concepts: **expressions** and **transformers**. An expression is declared with a keyword and a value, e.g. `foo:bar`. This expression is parsed and added to the final result. A transformer optionally transforms the expression value when it is added to the result. An example of a transformer would be to convert the value to a number, to capitalize it, ...

## Usage

### Install
* Get the dependency:
  * `$ bower install --save thomastuts/inquisitor`
* Include the dependency in your HTML file:
  * `<script src="bower_components/inquisitor/dist/inquisitor.js"></script>`
  * ...or
  * `<script src="bower_components/inquisitor/dist/inquisitor.min.js"></script>`

### Configure
Two Inquisitor components can be configured: expression sets and custom transformers.

#### Adding expressions
Before Inquisitor can parse your search strings, you'll need to let it know which keywords to parse, and to optionally transform their value using either a preset or a custom transformer (referenced by name):
```js
Inquisitor.addExpressionSet('myFirstExpressionSet', [
  {
    keyword: 'age',
    transform: 'number' // preset transformer
  },
  {
    keyword: 'name',
    transform: 'capitalized' // preset transformer
  },
  {
    keyword: 'foo' // no transformer, use value as-is
  },
  {
    keyword: 'fruit',
    transform: 'bananas' // custom transformer
  }
]);
```
Expressions are contained in *expression sets*. This way we can define multiple batches of keywords, allowing us to parse multiple versions of search strings.

#### Adding custom transformers
As mentioned before, you can optionally transform expression values when they are added to the Inquisitor result. This is handy for turning values into numbers, capitalizing them, ...
```js
Inquisitor.addTransformer('bananas', function (input) {
  return input + ' bananas';
});
```
In this example, any keyword that uses the custom `bananas` transformer will have `' bananas'` appended to its value.

### Parsing expressions
Use `Inquisitor.parse()` method to parse your search strings and get the result.

```js
Inquisitor.parse('myFirstExpressionSet', 'age:50 name:"john doe" foo:BAR fruit:chiquita');
```
The returned result in this example would be:

```js
{
  age: 50, // number transformer
  name: 'John Doe', // capitalized transformer
  foo: 'BAR', // no transformer
  fruit: 'chiquita bananas' // custom transformer
}
```

## API
#### `Inquisitor.addExpressionSet(name, expressionSet)`
Parameter      | Type          | Details
-------------- | ------------- |-------------
name           | String        | Used to identify which expression set to use when parsing a search string.
expressionSet  | Array         | A collection of expressions, with a required `keyword` property and an optional `transformer` property.

#### `Inquisitor.addTransformer(name, transformer)`
Parameter      | Type          | Details
-------------- | ------------- |-------------
name           | String        | Used to identify the transformer.
transformer    | Function      | An anonymous function that takes one argument (the value), transforms it and then returns it.

## License

The MIT License (MIT)

Copyright (c) 2014 Thomas Tuts

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
