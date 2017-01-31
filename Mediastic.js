const defaults = require('lodash.defaults');

const defaultOpts = {};

let Mediastic = module.exports = function (opts) {
  if (!(this instanceof Mediastic)) {
    return new Mediastic(opts);
  }
  let options = defaults(opts, defaultOpts);

  this.middlewares = [];
};

Mediastic.fileNameParser = require('./FileNameParser.js');
Mediastic.spotifyApi = require('./SpotifyAPI.js');
Mediastic.tagParser = require('./TagParser.js');

let proto = Mediastic.prototype;

proto._stack = function (meta, next) {
  next();
};

proto.use = function (middleware) {
  // We don't want promises, don't we?
  if (middleware.then)
    throw new Error('Expected a function, but got a Promise');

  this._stack = ((stack) => {
    return (metadata, next) => {
      stack(metadata, () => {
        middleware(metadata, next);
      });
    };
  })(this._stack);
}

proto.call = function(file) {

  return new Promise((resolve, reject) => {
    try {
      let metadata = {
        path: file
      };
      this._stack(metadata, () => {
        resolve(metadata);
      });
    } catch (err) {
      reject(err);
    }
  });
};
proto.loadDefaults = function (opts) {
  opts = opts || {};
  this.use(Mediastic.tagParser());
  this.use(Mediastic.fileNameParser());
  this.use(Mediastic.spotifyApi(opts.spotifyApi));
};
