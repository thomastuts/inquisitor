describe('Default transformers', function () {

  describe('capitalize', function () {
    it('should capitalize strings', function () {
      var input = 'bar:BaNaNa';
      var output = Inquirer.parse(input);

      output.should.deep.equal({
        bar: 'Banana'
      });
    });

    it('should capitalize quoted strings', function () {
      var input = 'bar:"a quoted STRING"';
      var output = Inquirer.parse(input);

      output.should.deep.equal({
        bar: 'A Quoted String'
      });
    });
  });

  describe('number', function () {
    it('should convert numbers', function () {
      var input = 'foo:550';
      var output = Inquirer.parse(input);

      output.should.deep.equal({
        foo: 550
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