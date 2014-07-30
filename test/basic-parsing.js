describe('Basic parsing functionality', function () {

  Inquirer.addExpressionSet('basicParsing', [
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

  it('should parse expressions by keyword', function () {
    var input = 'foo:5 bar:banana';
    var output = Inquirer.parse('basicParsing', input);

    output.should.deep.equal({
      foo: 5,
      bar: 'Banana'
    });
  });

  it('should parse wildcards', function () {
    var input = 'some random words';
    var output = Inquirer.parse('basicParsing', input);

    output.should.deep.equal({
      wildcard: 'some random words'
    });
  });

  it('should exclude keywords with no values', function () {
    var input = 'foo: bar:banana';
    var output = Inquirer.parse('basicParsing', input);

    output.should.deep.equal({
      bar: 'Banana'
    });
  });

  it('should parse quoted keywords', function () {
    var input = 'bar:"Quoted string"';
    var output = Inquirer.parse('basicParsing', input);

    output.should.deep.equal({
      bar: 'Quoted String'
    });
  });

});
