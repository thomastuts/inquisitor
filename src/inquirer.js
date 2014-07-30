(function () {
  var Inquirer = {};

  var declaredExpressions = {};

  var transformers = {
    number: function (value) {
      return parseInt(value);
    },
    capitalized: function (value) {
      value = value.toLowerCase();

      if (value.indexOf(' ') === -1) {
        return value.charAt(0).toUpperCase() + value.slice(1);
      }
      else {
        var words = value.split(' ');

        for (var i = 0; i < words.length; i++) {
          var word = words[i];
          words[i] = word.charAt(0).toUpperCase() + word.slice(1);
        }

        return words.join(' ');
      }
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
        var value = expression[1].replace(/"/g, '');
        var transform = declaredExpressions[keyword];

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

  Inquirer.addTransformer = function (name, transformer) {
    transformers[name] = transformer;
  };

  Inquirer.setExpressionSet = function (expressionSet) {
    for (var i = 0; i < expressionSet.length; i++) {
      var expression = expressionSet[i];
      declaredExpressions[expression.keyword] = expression.transform || null;
    }
  };

  Inquirer.parse = parse;

  window.Inquirer = Inquirer;
})();
