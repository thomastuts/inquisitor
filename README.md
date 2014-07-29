# Inquirer

**Inquirer extracts expressions from a Gmail-like search string (e.g. 'name:Inquirer subject:"Check this out"') in AngularJS.** The resulting query is an object with the expression's keyword and value. The expression value can optionally be transformed, either by a preset transformer or a custom one.

## Usage

### Install
* Get the dependency:
  * `$ bower install --save thomastuts/angular-inquirer`
* Include the dependency in your HTML file:
  * `<script src="bower_components/angular-inquirer/dist/inquirer.js"></script>`
  * ...or
  * `<script src="bower_components/angular-inquirer/dist/inquirer.min.js"></script>`
* Add the dependency to your Angular application:
  * `angular.module('exampleApp', ['thomastuts.inquirer']);`

### Configure
You can configure Inquirer in your application's `.config()` section.

#### Adding expressions
```js
// app.js
angular.module('exampleApp', ['thomastuts.inquirer'])
  .config(function (InquirerProvider) {
    InquirerProvider.setExpressions([
      {
        keyword: 'age',
        transform: 'number' // preset transformer
      },
      {
        keyword: 'name',
        transform: 'capitalized' // preset transformer
      },
      {
        keyword: 'foo' // no transform, use value as-is
      },
      {
        keyword: 'fruit',
        transform: 'bananas' // custom transformer
      }
    ]);
  });
```

#### Adding custom transformers
```js
angular.module('exampleApp', ['thomastuts.inquirer'])
  .config(function (InquirerProvider) {
    InquirerProvider.addTransformer('bananas', function (input) {
      return input + ' bananas';
    });
  });
```

### Parsing expressions
Inject the `Inquirer` service in your service/controller/... and use it to parse a search string:

```js
// controller.js
angular.module('exampleApp')
  .controller('ExampleCtrl', function (Inquirer) {
    var searchString = 'age:50 name:"john doe" foo:BAR fruit:chiquita';
    var query = Inquirer.parse($scope.searchString);
  });
```
In this example, `query` would equal:

```js
{
  age: 50,
  name: 'John Doe',
  foo: 'BAR',
  fruit: 'chiquita bananas'
}
```


