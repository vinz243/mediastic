module.exports = function (name) {
  let fileRegex = /^((\d){0,2}\.?(.+-)?(.+))\.(mp3|flac)$/g;
  let match = fileRegex.exec(name);

  // console.log('m1', match);
  return match[4].replace(/_/g, ' ').trim();
};
