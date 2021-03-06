'use strict';

var assert = require('chai').assert;
var parser = require('signet-parser')();
var assembler = require('../index');

describe('Signet Type Assembler', function () {

    describe('assembleType', function () {

        it('should assemble a single type object', function () {
            var typeObj = parser.parseType('[ tuple <string; int> ]');

            assert.equal(assembler.assembleType(typeObj), '[tuple<string;int>]');
        });

    });

    describe('assembleSignature', function () {

        it('should assemble a function signature', function () {
            var expected = '* => string, [tuple<string;number>] => object';
            var typeTree = parser.parseSignature(expected);

            assert.equal(assembler.assembleSignature(typeTree), expected);
        });

        it('should assemble a function signature with all the bells and whistles', function () {
            var expected = 'A < B :: A:int, B:int, foo:[formattedString<bar>] => *';
            var typeTree = parser.parseSignature(expected);

            assert.equal(assembler.assembleSignature(typeTree), expected);
        });

    });

});