# Inquisitor

**Inquisitor extracts key/value pairs from a string.**

It turns this:

`'is:open is:issue author:"Thomas Tuts"'`

into this:

```js
{
  is: ['open', 'issue'],
  author: 'Thomas Tuts'
}
```

## Usage

### Install

**Bower**: `$ bower install --save thomastuts/inquisitor`

**npm**: `$ npm install --save thomastuts-inquisitor`

Inquisitor can be used as either a CommonJS module, or as a standalone global variable to use in the browser (`Inquisitor`).

### Creating a parser
To create a parser, simply call `Inquisitor.createParser()` and pass in the options (see below for a full list). 

```js
var parser = Inquisitor.createParser({
  pairs: [
    {
      key: 'foo'
    },
    {
      key: 'bar'
    }
  ]
});
```

### Parsing a string
To parse a string using the parser you created, call `parser.parse(input)`.

```js
parser.parse('foo:one bar:two'); // result is {foo: 'one', bar: 'two'}
```

## Options
There are two kinds of options: options for the entire parser, and options for a specific key/value pair.

### Parser options
#### `pairs` (Array)
`pairs` should be an array of objects containing the 'key' property and any pair options (see below). By default, only key/value pairs that are defined in `pairs` are added to the result, unless `allowAllKeys` is set to `true` (see below).

```js
var parser = Inquisitor.createParser({
  pairs: [
    {
      key: 'foo',
      multipleValues: true
    },
    {
      key: 'bar'
    }
  ]
});
```

#### `allowAllKeys` (Boolean)
If `allowAllKeys` is set to true, the parser will add any key/value pair to the result, regardless of them being defined in `pairs` or not (the defined ones will still use their configuration if you have passed in options for that pair).

#### `delimiter` (String)
Changes the delimiter that separates the key from the value.

### Pair options
#### `multipleValues`
If `multipleValues` is set to `true`, the result for that key will have an array of values instead of a string.

## License

The MIT License (MIT)

Copyright (c) 2015 Thomas Tuts

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
