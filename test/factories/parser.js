describe('Inquirer', function () {
  var Inquirer;

  beforeEach(function () {
    module('thomastuts.inquirer');

    inject(function ($injector) {
      Inquirer = $injector.get('Inquirer');
    });
  });

  describe('Basic parsing functionality', function () {

    it('should parse expressions by keyword', function () {
      var input = 'cost:5 rarity:epic';
      var output = Inquirer.parse(input);

      output.should.deep.equal({
        cost: 5,
        rarity: 'Epic'
      });
    });

    it('should parse wildcards', function () {
      var input = 'foo bar baz';
      var output = Inquirer.parse(input);

      output.should.deep.equal({
        wildcard: 'foo bar baz'
      });
    });

    it('should exclude keywords with no values', function () {
      var input = 'cost: rarity:epic';
      var output = Inquirer.parse(input);

      output.should.deep.equal({
        rarity: 'Epic'
      });
    });

  });

  describe('Combined parsing functionality', function () {

    it('should parse expressions and a wildcard at the start of the input', function () {
      var input = 'foo bar baz cost:5 rarity:epic';
      var output = Inquirer.parse(input);

      output.should.deep.equal({
        wildcard: 'foo bar baz',
        cost: 5,
        rarity: 'Epic'
      });
    });

    it('should parse expressions and a wildcard in the middle of the input', function () {
      var input = 'cost:5 foo bar baz rarity:epic';
      var output = Inquirer.parse(input);

      output.should.deep.equal({
        wildcard: 'foo bar baz',
        cost: 5,
        rarity: 'Epic'
      });
    });

    it('should parse expressions and a wildcard at the end of the input', function () {
      var input = 'cost:5 rarity:epic foo bar baz';
      var output = Inquirer.parse(input);

      output.should.deep.equal({
        wildcard: 'foo bar baz',
        cost: 5,
        rarity: 'Epic'
      });
    });


  });

});
