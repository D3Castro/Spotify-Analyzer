import requests

from flask import (
    Blueprint, request, session, jsonify
)
from markupsafe import escape

from .models.error import Error
from .cache import cache

bp = Blueprint('user', __name__, url_prefix='/user')
CACHE_TIMEOUT = 24 * 60 * 60    # 1 day

# Spotify URLS
SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_API_BASE_URL = "https://api.spotify.com"
API_VERSION = "v1"
SPOTIFY_API_URL = "{}/{}".format(SPOTIFY_API_BASE_URL, API_VERSION)

VALID_TOP_TYPES = ['artists', 'tracks']
VALID_TIME_RANGES = ['short_term', 'medium_term', 'long_term']

# @cache.memoize(timeout=CACHE_TIMEOUT)
def get_auth_header(token):
    return {"Authorization": "Bearer {}".format(token)}


@cache.memoize(timeout=CACHE_TIMEOUT)
def get_user_top_for_time_range(access_token, top_type, time_range):
    response = requests.get(url=f"https://api.spotify.com/v1/me/top/{top_type}?time_range={time_range}",
                            headers=get_auth_header(access_token))
    return response.json()


@cache.memoize(timeout=CACHE_TIMEOUT)
def get_track_list_audio_features(access_token, track_ids_list):
    response = requests.get("https://api.spotify.com/v1/audio-features",
                            params={'ids': ','.join(track_ids_list)},
                            headers=get_auth_header(access_token))
    return response.json()


@cache.memoize(timeout=CACHE_TIMEOUT)
def get_average_from_list(value_list):
    return sum(value_list) / len(value_list)


@cache.memoize(timeout=CACHE_TIMEOUT)
def get_formatted_audio_features(audio_features_list):
    audio_feature_types = ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'loudness', 'speechiness', 'valence', 'tempo']

    audio_features_data = {}
    for audio_feature in audio_features_list:
        for feature_type, value in audio_feature.items():
            if feature_type not in audio_feature_types:
                continue

            if feature_type not in audio_features_data:
                audio_features_data[feature_type] = []
            audio_features_data[feature_type].append(value)

    audio_features_avgs = {}
    for feature_type, value_list in audio_features_data.items():
        audio_features_avgs[feature_type] = round(get_average_from_list(value_list), 2)

    return [
        {'audioFeature': 'Acousticness', 'average': audio_features_avgs.get('acousticness', 0), 'fullMark': 1.0},
        {'audioFeature': 'Danceability', 'average': audio_features_avgs.get('danceability', 0), 'fullMark': 1.0},
        {'audioFeature': 'Energy', 'average': audio_features_avgs.get('energy', 0), 'fullMark': 1.0},
        {'audioFeature': 'Instrumentalness', 'average': audio_features_avgs.get('instrumentalness', 0), 'fullMark': 1.0},
        {'audioFeature': 'Liveness', 'average': audio_features_avgs.get('liveness', 0), 'fullMark': 1.0},
        {'audioFeature': 'Speechiness', 'average': audio_features_avgs.get('speechiness', 0), 'fullMark': 1.0},
        {'audioFeature': 'Valence', 'average': audio_features_avgs.get('valence', 0), 'fullMark': 1.0},
    ]


@bp.route("/top/<top_type>", methods=['GET'])
def get_user_details(top_type):
    access_token = session.get('access_token', None)
    top_type = escape(top_type)
    time_range = request.args.get('time_range', 'long_term')

    if access_token is None:
        raise Error('Not logged in.')

    if top_type not in VALID_TOP_TYPES:
        raise Error(f'Top \'type\' should be one of {VALID_TOP_TYPES}.')

    if time_range not in VALID_TIME_RANGES:
        raise Error(f'Top \'time_range\' should be one of {VALID_TIME_RANGES}.')

    response = get_user_top_for_time_range(access_token=access_token, top_type=top_type, time_range=time_range)

    if 'error' in response:
        raise Error(response['error']['message'])

    return format_response(response['items'])


@bp.route("/top/tracks/audio-features", methods=['GET'])
def get_track_audio_features():
    access_token = session.get('access_token', None)
    time_range = request.args.get('time_range', 'long_term')

    if access_token is None:
        raise Error('Not logged in.')

    if time_range not in VALID_TIME_RANGES:
        raise Error(f'Top \'time_range\' should be one of {VALID_TIME_RANGES}.')

    top_tracks_response = get_user_top_for_time_range(access_token=access_token, top_type='tracks', time_range=time_range)
    top_tracks_response = top_tracks_response['items']
    track_ids_list = [track['id'] for track in top_tracks_response]
    response = get_track_list_audio_features(access_token=access_token, track_ids_list=track_ids_list)

    if 'error' in response:
        raise Error(response['error']['message'])

    audio_features_list = response['audio_features']
    formatted_audio_feature_data = get_formatted_audio_features(audio_features_list=audio_features_list)

    return format_response(formatted_audio_feature_data)


def format_response(data):
    return jsonify({
        "status": "SUCCESS",
        "data": data
    })
