'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (name) {
  var fileRegex = /^((\d){0,2}\.?(.+-)?(.+))\.(mp3|flac)$/g;
  var match = fileRegex.exec(name);

  // console.log('m1', match);
  return match[4].replace(/_/g, ' ').trim();
};