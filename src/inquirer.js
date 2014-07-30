(function () {
  var Inquirer = {};

  var expressionSets = {};

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

  function parse (expressionSet, input) {
    var expressions = input.match(keywordRegex);
    var searchExpression = {};

    if (expressions) {
      for (var i = 0; i < expressions.length; i++) {
        var expression = expressions[i].split(':');
        var keyword = expression[0];
        var value = expression[1].replace(/"/g, '');
        var transform = expressionSets[expressionSet][keyword];

        if (value) {
          searchExpression[keyword] = transform ? transformers[transform](value) : value;
        }

        input = input.replace(expressions[i], '').trim();
      }
    }

    // Remove any keywords without a value from the remaining string
    input = input.replace(/([A-Za-z\d_-]+):/gi, '').trim();

    if (input) {
      searchExpression.wildcard = input;
    }

    return searchExpression;
  }

  Inquirer.addTransformer = function (name, transformer) {
    transformers[name] = transformer;
  };

  Inquirer.addExpressionSet = function (name, expressionSet) {
    expressionSets[name] = {};

    for (var i = 0; i < expressionSet.length; i++) {
      var expression = expressionSet[i];
      expressionSets[name][expression.keyword] = expression.transform || null;
    }
  };

  Inquirer.parse = parse;

  window.Inquirer = Inquirer;
})();
