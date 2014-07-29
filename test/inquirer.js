describe('Inquirer', function () {
  var Inquirer;

  beforeEach(function () {
    module('thomastuts.inquirer');

    module(function (InquirerProvider) {
      InquirerProvider.setExpressions([
        {
          keyword: 'cost',
          transform: 'number'
        },
        {
          keyword: 'rarity',
          transform: 'capitalized'
        },
        {
          keyword: 'noTransform'
        },
        {
          keyword: 'custom',
          transform: 'customTransform'
        }
      ]);

      InquirerProvider.addTransformer('customTransform', function (input) {
        return input.toUpperCase();
      });
    });

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

    it('should parse quoted keywords', function () {
      var input = 'rarity:"Quoted"';
      var output = Inquirer.parse(input);

      output.should.deep.equal({
        rarity: 'Quoted'
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

  describe('Default transformers', function () {

    describe('capitalize', function () {
      it('should capitalize strings', function () {
        var input = 'rarity:epIC';
        var output = Inquirer.parse(input);

        output.should.deep.equal({
          rarity: 'Epic'
        });
      });

      it.only('should capitalize quoted strings', function () {
        var input = 'rarity:"a quoted STRING"';
        var output = Inquirer.parse(input);

        output.should.deep.equal({
          rarity: 'A Quoted String'
        });
      });
    });

    describe('number', function () {
      it('should convert numbers', function () {
        var input = 'cost:550';
        var output = Inquirer.parse(input);

        output.should.deep.equal({
          cost: 550
        });
      });
    });

    describe('no transform', function () {
      it('should not transform values if no transformer is found', function () {
        var input = 'noTransform:no_TraNsFoRm';
        var output = Inquirer.parse(input);

        output.should.deep.equal({
          noTransform: 'no_TraNsFoRm'
        });
      });
    });

  });

  describe('Custom transformers', function () {

    it('should register custom transformers', function () {
      Inquirer.transformers.customTransform.should.exist;
    });

    it('should transform values according to the given transformer', function () {
      var input = 'custom:abcdef';
      var output = Inquirer.parse(input);

      output.should.deep.equal({
        custom: 'ABCDEF'
      });
    });

  });

});
