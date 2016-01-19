/**
 * ConvertController
 *
 * @description :: Server-side logic for managing converts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('lodash');

var letters = {

  a: '100000',
  b: '101000',
  c: '110000',
  d: '110100',
  e: '100100',
  f: '111000',
  g: '111100',
  h: '101100',
  i: '011000',
  j: '011100',
  k: '100010',
  l: '101010',
  m: '110010',
  n: '110110',
  o: '100110',
  p: '111010',
  q: '111110',
  r: '101110',
  s: '011010',
  t: '011110',
  u: '100011',
  v: '101011',
  w: '011101',
  x: '110011',
  y: '110111',
  z: '100111'

};

module.exports = {
	translate: function(req, res) {
    theword = '[Braille Text]<\/br>';
    theword += 'row1: .O O. .O OO O. O. .O OO O. OO O. .O O. .O<\/br>';
    theword += 'row2: O. .O O. .. .. OO OO .. .. .. OO OO .O OO<\/br>';
    theword += 'row3: O. O. O. O. .. O. O. O. OO .. .. .O O. .O<\/br><\/br>';
    theword += '[Result]<\/br>';
    sails.controllers.convert.decode(req, function(result) {
      var step = 0;
      var char = [];
      for(var i = 1; i < (result[0].length / 2) + 1; i++) {
        char[i] = result[0].substring(step, step+2) + result[1].substring(step, step+2) + result[2].substring(step, step+2);
        step += 2;
        _.forEach(letters, function(n, key) {
          if(n == char[i]) {
            theword += key;
          }
        });
      }
    });

    return res.send(theword);
  },

  decode: function(req, res) {
    req.rows = ['.O O. .O OO O. O. .O OO O. OO O. .O O. .O', 'O. .O O. .. .. OO OO .. .. .. OO OO .O OO', 'O. O. O. O. .. O. O. O. OO .. .. .O O. .O'];
    //hello world
    //req.rows = ['O. O. O. O. O. .O O. O. O. OO', 'OO .O O. O. .O OO .O OO O. .O', '.. .. O. O. O. .O O. O. O. ..'];
    var data = req.rows;
    _.forEach(data, function(n, key) {
      data[key] = n.replace(/\s+/g, '').replace(/O/g,'1').replace(/\./g,'0');
    });
    return res(data);
  }
};

