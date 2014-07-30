describe('Custom transformers', function () {

  Inquirer.addTransformer('customTransform', function (input) {
    return input.toUpperCase();
  });

  Inquirer.addExpressionSet('customTransformers', [
    {
      keyword: 'custom',
      transform: 'customTransform'
    }
  ]);

  it('should transform values with a custom transformer', function () {
    var input = 'custom:abcdef';
    var output = Inquirer.parse('customTransformers', input);

    output.should.deep.equal({
      custom: 'ABCDEF'
    });
  });

});
