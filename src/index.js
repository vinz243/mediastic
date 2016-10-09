import fileNameParser from './fileNameParser';
import provider from './spotify.provider';

export default async (file) => {
  let name = file.replace(/^.*[\\\/]/, '');

  // console.log(file, name);

  let trackTitle = fileNameParser(name);

  return await provider().searchTrack(trackTitle);
};
