'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  return {
    searchTrack: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(name) {
        var res, item, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _requestPromise2.default)({
                  uri: 'https://api.spotify.com/v1/search',
                  qs: {
                    'q': name,
                    'type': 'track',
                    'limit': 1
                  },
                  json: true
                });

              case 2:
                res = _context.sent;
                item = res.tracks.items[0];
                data = {
                  artistName: item.artists[0].name,
                  albumName: item.album.name,
                  duration: item.duration_ms / 1000,
                  trackTitle: item.name
                };
                return _context.abrupt('return', data);

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function searchTrack(_x) {
        return _ref.apply(this, arguments);
      };
    }()
  };
};