import axios from 'axios';

async function fetchData(endpoint, timeRange) {
  try {
    const res = await axios.get(`${endpoint}?time_range=${timeRange}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getUserTopArtists(timeRange) {
  return fetchData('/user/top/artists', timeRange);
}

export async function getUserTopTracks(timeRange) {
  return fetchData('/user/top/tracks', timeRange);
}

export async function getUserTopTracksAudioFeatures(timeRange) {
  return fetchData('/user/top/tracks/audio-features', timeRange);
}