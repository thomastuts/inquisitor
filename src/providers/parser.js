angular.module('thomastuts.inquirer')
  .provider('Inquirer', function () {

    var declaredExpressions = [];

    var transformers = {
      number: function (value) {
        return parseInt(value);
      },
      capitalized: function (value) {
        return _.str.capitalize(value.toLowerCase());
      }
    };

    var keywordRegex = /([A-Za-z\d_-]+):((".*?")|([A-Za-z\d_-]+))/gi;

    function parse (input) {
      var expressions = input.match(keywordRegex);
      var searchExpression = {};

      if (expressions) {
        for (var i = 0; i < expressions.length; i++) {
          var expression = expressions[i].split(':');
          var keyword = expression[0];
          var value = expression[1].replace('"', '');
          var transform = _.find(declaredExpressions, { keyword: keyword }).transform;

          if (value) {
            searchExpression[keyword] = transform ? transformers[transform](value) : value;
          }

          input = input.replace(expressions[i], '').trim();
        }
      }

      // Strip any keywords out that have a null value
      input = input.replace(/([A-Za-z\d_-]+):/gi, '').trim();

      if (input) {
        searchExpression.wildcard = input;
      }

      return searchExpression;
    }

    this.$get = function () {
      return {
        parse: parse
      }
    };

    this.addTransformer = function (name, transform) {
      transformers[name] = transform;
    };

    this.setExpressions = function (expressions) {
      declaredExpressions = expressions;
    };
  });
