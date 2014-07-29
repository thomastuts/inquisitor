angular.module('thomastuts.inquirer')
  .factory('Inquirer', function (InquirerTransformers) {

    var availableExpressions = [
      {
        keyword: 'cost',
        transform: 'number'
      },
      {
        keyword: 'rarity',
        transform: 'capitalized'
      }
    ];

    var keywordRegex = /([A-Za-z\d_-]+):((".*?")|([A-Za-z\d_-]+))/gi;

    function parse (input) {
      var expressions = input.match(keywordRegex);
      var searchExpression = {};

      if (expressions) {
        for (var i = 0; i < expressions.length; i++) {
          var expression = expressions[i].split(':');
          var keyword = expression[0];
          var value = expression[1].replace('"', '');
          var transform = _.find(availableExpressions, { keyword: keyword }).transform;

          if (value) {
            searchExpression[keyword] = InquirerTransformers[transform](value);
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

    return {
      parse: parse
    };

  });
