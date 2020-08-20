import axios from 'axios';

export function getUserTopArtists(timeRange) {
  return new Promise((resolve, reject) => {
    axios
      .get('/user/top/artists?time_range=' + timeRange)
      .then(
        res => resolve(res.data),
        err => reject(err)
      );
  });
}

export function getUserTopTracks(timeRange) {
  return new Promise((resolve, reject) => {
    axios
      .get('/user/top/tracks?time_range=' + timeRange)
      .then(
        res => resolve(res.data),
        err => reject(err)
      );
  });
}

export function getUserTopTracksAudioFeatures(timeRange) {
  return new Promise((resolve, reject) => {
    axios
      .get('/user/top/tracks/audio-features?time_range=' + timeRange)
      .then(
        res => resolve(res.data),
        err => reject(err)
      );
  });
}
