'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fileNameParser = require('./fileNameParser');

var _fileNameParser2 = _interopRequireDefault(_fileNameParser);

var _spotify = require('./spotify.provider');

var _spotify2 = _interopRequireDefault(_spotify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(file) {
    var name, trackTitle;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = file.replace(/^.*[\\\/]/, '');

            // console.log(file, name);

            trackTitle = (0, _fileNameParser2.default)(name);
            _context.next = 4;
            return (0, _spotify2.default)().searchTrack(trackTitle);

          case 4:
            return _context.abrupt('return', _context.sent);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();