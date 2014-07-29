angular.module('thomastuts.inquirer')
  .factory('SearchExpressionTransformers', function () {

    return {
      number: function (value) {
        return parseInt(value);
      },
      capitalized: function (value) {
        return _.str.capitalize(value.toLowerCase());
      }
    }

  });
