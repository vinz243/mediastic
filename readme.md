# Mediastic
![](https://travis-ci.org/vinz243/mediastic.svg?branch=master)

Middleware based track identification tool.

Mediastic aims to find artist, title and album from any given track
By default it will support tag parsing, file name parsing and spotify search.
Its middleware architecture allows to configure and write plugins easily,
layer that can add piece of metadata if found (or not).

### API

#### `Mediastic`

**`constructor()`**: constructor. `new` is optional.  No arguments needed.

**`use(middleware: function)`**: adds a middleware function on top of the stack.
The function is called with two arguments. First one is the `metadata` object,
second is `next` function. This function *has* to be called once and only
once. Returns nothing.

**`call(path: string)`**: call the middleware stack with `{path: path}` as metadata
object. Returns a promise, which resolves when stack finished.

**`loadDefaults([opts])`**: configure mediastic with default stack provided with
Mediastic (`TagParser` => `FileNameParser` => `SpotifyAPI`). `opts` is the options
passed to middlewares.

**`static tagParser()`**: TagParser middleware constructor. No arguments needed

**`static fileNameParser()`**: FileNameParser middleware.

**`static spotifyApi([opts])`** SpotifyAPI middleware. Options is:

```js
const defaultOpts = {
  // Duration treshold used to compare tracks
  // When spotify returns several results for a given query,
  // We can't know which track to choose
  // So we filter them based on their duration
  // Any result which exceeds Math.abs(resultDuration - fileDuration)
  // by this value will be removed. Duration in seconds

  durationTreshold: 2,

  // When comparing durations, that comparison may only be relevant for
  // long enough tracks: any result shorter than this value will be accepted

  minimumDuration: 15,

  // Any result which album name matches this
  // will be filtered out if there are too many results
  // WARNING: Do not set GLOBAL flag. This will break everything

  albumKeywordBlacklist: /deluxe|renditions/i
}
```

### Roadmap

Support AcoustID

Support Discogs

Support Gracenote SDK (looking for help for making addon)
