describe('Combined parsing functionality', function () {

  Inquisitor.addExpressionSet('combinedParsing', [
    {
      keyword: 'foo',
      transform: 'number'
    },
    {
      keyword: 'bar',
      transform: 'capitalized'
    },
    {
      keyword: 'baz'
    }
  ]);

  it('should parse expressions and a wildcard at the start of the input', function () {
    var input = 'some random words foo:5 bar:banana';
    var output = Inquisitor.parse('combinedParsing', input);

    output.should.deep.equal({
      wildcard: 'some random words',
      foo: 5,
      bar: 'Banana'
    });
  });

  it('should parse expressions and a wildcard in the middle of the input', function () {
    var input = 'foo:5 some random words bar:banana';
    var output = Inquisitor.parse('combinedParsing', input);

    output.should.deep.equal({
      wildcard: 'some random words',
      foo: 5,
      bar: 'Banana'
    });
  });

  it('should parse expressions and a wildcard at the end of the input', function () {
    var input = 'foo:5 bar:banana some random words';
    var output = Inquisitor.parse('combinedParsing', input);

    output.should.deep.equal({
      wildcard: 'some random words',
      foo: 5,
      bar: 'Banana'
    });
  });

});
