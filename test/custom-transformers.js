describe('Custom transformers', function () {

  Inquisitor.addTransformer('customTransform', function (input) {
    return input.toUpperCase();
  });

  Inquisitor.addExpressionSet('customTransformers', [
    {
      keyword: 'custom',
      transform: 'customTransform'
    }
  ]);

  it('should transform values with a custom transformer', function () {
    var input = 'custom:abcdef';
    var output = Inquisitor.parse('customTransformers', input);

    output.should.deep.equal({
      custom: 'ABCDEF'
    });
  });

});
