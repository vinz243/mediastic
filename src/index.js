import fileNameParser from './fileNameParser';
import provider from './spotify.provider';

export default async (file) => {
  let name = file.replace(/^.*[\\\/]/, '');

  // console.log(file, name);

  let trackTitle = fileNameParser(name);

  let res = await provider().searchTrack(trackTitle);
  res.path = file;
  return res;
};
