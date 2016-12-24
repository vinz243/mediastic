
// This middleware will try to parse name from the file name
// This works on a selection of file name patterns
// If it doesn't work on some track, please feel free to add use case in tests

module.exports = function () {
  return function (metadata, next) {
  	let name = metadata.path.replace(/^.*[\\\/]/, '');

    // Let's break down this regex:

    // First part ((\d){0,2}\.?(.+-)?(.+?)):
    //    (\d){0,2}\.? is an optional track number (TBD) with an optional .
    //    (.+-)?  can be anything before the real track name (album/artist)
    //            we expect the track title to be at the end
    //    (.+?)   non greedy track name (we don't want feat)

    // Second part: (feat.+)?\.(mp3|flac)
    //    (feat.+)? removes teh featuring from track title if it exists
    //    \.(mp3|flac) matches extension

    let fileRegex = /^((\d){0,2}\.?(.+-)?(.+?))(feat.+)?\.(mp3|flac)$/g;
    let match = fileRegex.exec(name);

    // If it doesn't match, we continue flow

    if (!match) return next();

    // Some torrents release might contain _ instead of regular spaces
    // This is a problem also because those releases tend to skip apostophes
    // Which doesn't help matching the name in an api
    // BTW we remove extra spaces, faster than in regex

    metadata.title = match[4].replace(/_/g, ' ').trim();

    // Finally call other middlewares so they can do their jobs
    next();
  };
}
