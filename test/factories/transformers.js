describe('InquirerTransformers', function () {
  var InquirerTransformers;

  beforeEach(function () {
    module('thomastuts.inquirer');

    inject(function ($injector) {
      InquirerTransformers = $injector.get('InquirerTransformers');
    });
  });

  describe('Value transformation', function () {

    it('number', function () {
      InquirerTransformers.number('5').should.equal(5);
    });

    it('capitalized', function () {
      InquirerTransformers.capitalized('foOBAr').should.equal('Foobar');
    });

  });

});
