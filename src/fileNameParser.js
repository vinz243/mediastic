module.exports = function (name) {
  let fileRegex = /^((\d){0,2}\.?(.+-)?(.+?))(feat.+)?\.(mp3|flac)$/g;
  let match = fileRegex.exec(name);

  return match[4].replace(/_/g, ' ').trim();
};
