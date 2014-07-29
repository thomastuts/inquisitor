describe('SearchExpressionTransformers', function () {
  var SearchExpressionTransformers;

  beforeEach(function () {
    module('thomastuts.inquirer');

    inject(function ($injector) {
      SearchExpressionTransformers = $injector.get('SearchExpressionTransformers');
    });
  });

  describe('Value transformation', function () {

    it('number', function () {
      SearchExpressionTransformers.number('5').should.equal(5);
    });

    it('capitalized', function () {
      SearchExpressionTransformers.capitalized('foOBAr').should.equal('Foobar');
    });

  });

});
