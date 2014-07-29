angular.module('thomastuts.inquirer')
  .factory('InquirerTransformers', function () {

    return {
      number: function (value) {
        return parseInt(value);
      },
      capitalized: function (value) {
        return _.str.capitalize(value.toLowerCase());
      }
    }

  });
