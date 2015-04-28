'use strict';

function Inquisitor() {
  this.transforms.sayHello();
}

Inquisitor.prototype.transforms = {
  sayHello: function () {
    console.log('Hello!');
  }
};

module.exports = Inquisitor;
