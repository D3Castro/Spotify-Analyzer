import axios from 'axios';
import { removeHashParams } from './url';

const config = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
};

export async function getLoginRedirect() {
  try {
    const res = await axios.get('/auth/redirect-spotify');
    return res.data;
  } catch (error) {
    console.error('Error in getLoginRedirect:', error);
    throw error;
  }
}

export async function registerSpotify(code) {
  try {
    const res = await axios.post('/auth/user', { code: removeHashParams(code) }, config);
    return res.data;
  } catch (error) {
    console.error('Error in registerSpotify:', error);
    throw error;
  }
}

export async function getSpotifyUser() {
  try {
    const res = await axios.get('/auth/user');
    return res.data;
  } catch (error) {
    console.error('Error in getSpotifyUser:', error);
    throw error;
  }
}

export async function logout() {
  try {
    const res = await axios.get('/auth/logout');
    return res;
  } catch (error) {
    console.error('Error in logout:', error);
    throw error;
  }
}