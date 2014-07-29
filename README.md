# Inquirer

**Inquirer provides a way to extract expressions from a Gmail-like search string (e.g. 'name:Inquirer subject:"Check this out"') in AngularJS.** The resulting query is an object with the expression's keyword and value. The expression value can optionally be transformed, either by a preset transformer or a custom one.

## Quick example
```js
// app.js
angular.module('exampleApp', ['thomastuts.inquirer'])
  .config(function (InquirerProvider) {
    InquirerProvider.setExpressions([
      {
        keyword: 'age',
        transform: 'number'
      },
      {
        keyword: 'name',
        transform: 'capitalized'
      },
      {
        keyword: 'fruit'
      }
    ]);
  });
```

```js
// controller.js
angular.module('exampleApp')
  .controller('ExampleCtrl', function (Inquirer) {
    var searchString = 'age:50 name:"john doe" fruit:BANANA';
    var query = Inquirer.parse($scope.searchString);
  });
```
In this example, `query` would equal:

```js
{
  age: 50,
  name: 'John Doe',
  fruit: 'BANANA'
}
````
