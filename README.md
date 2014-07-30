# Inquirer

**Inquirer extracts expressions from a Gmail-like search string.** Expression values can optionally be transformed during parsing.

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
Inquirer has two major concepts: **expressions** and **transformers**. An expression is declared with a keyword and a value, e.g. `foo:bar`. This expression is parsed and added to the final result. A transformer optionally transforms the expression value when it is added to the result. An example of a transformer would be to convert the value to a number, to capitalize it, ...

## Usage

### Install
* Get the dependency:
  * `$ bower install --save thomastuts/inquirer`
* Include the dependency in your HTML file:
  * `<script src="bower_components/inquirer/dist/inquirer.js"></script>`
  * ...or
  * `<script src="bower_components/inquirer/dist/inquirer.min.js"></script>`

### Configure
Two Inquirer components can be configured: expression sets and custom transformers.

#### Adding expressions
Before Inquirer can parse your search strings, you'll need to let it know which keywords to parse, and to optionally transform their value using either a preset or a custom transformer (referenced by name):
```js
Inquirer.addExpressionSet('myFirstExpressionSet', [
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
> Expressions are contained in *expression sets*. This way we can define multiple batches of keywords, allowing us to parse multiple versions of search strings.

#### Adding custom transformers
As mentioned before, you can optionally transform expression values when they are added to the Inquirer result. This is handy for turning values into numbers, capitalizing them, ...
```js
Inquirer.addTransformer('bananas', function (input) {
  return input + ' bananas';
});
```
> In this example, any keyword that uses the custom `bananas` transformer will have `' bananas'` appended to its value. 

### Parsing expressions
Use `Inquirer.parse()` method to parse your search strings and get the result. 

```js
Inquirer.parse('myFirstExpressionSet, 'age:50 name:"john doe" foo:BAR fruit:chiquita');
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
### `Inquirer.addExpressionSet(expressionName, expressionSet)`
Parameter      | Type          | Details
-------------- | ------------- |-------------
expressionName | String        | Used to identify which expression set to use when parsing a search string.
expressionSet  | Array         | A collection of expressions, with a required `keyword` property and an optional `transformer` property.

### `Inquirer.addTransformer(transformerName, transformerFunction)`
Parameter      | Type          | Details
-------------- | ------------- |-------------
expressionName | String        | Used to identify the transformer.
expressionSet  | Function      | An anonymous function that takes one argument (the value), transforms it and then returns it.
