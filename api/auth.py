import os
import requests
from urllib.parse import quote

from flask import (
    Blueprint, g, request, session, json, jsonify, make_response, current_app
)

from .db import get_db

bp = Blueprint('auth', __name__, url_prefix='/auth')

# Spotify URLS
SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_API_BASE_URL = "https://api.spotify.com"
API_VERSION = "v1"
SPOTIFY_API_URL = "{}/{}".format(SPOTIFY_API_BASE_URL, API_VERSION)

# Server-side Parameters
REDIRECT_URI = "http://localhost:3000/"
SCOPE = "user-read-email user-read-private user-library-read user-top-read"
STATE = ""
SHOW_DIALOG_bool = True
SHOW_DIALOG_str = str(SHOW_DIALOG_bool).lower()

auth_query_parameters = {
    "response_type": "code",
    "redirect_uri": REDIRECT_URI,
    "scope": SCOPE,
    # "state": STATE,
    # "show_dialog": SHOW_DIALOG_str,
    "client_id": os.getenv('CLIENT_ID')
}


def get_auth_header(token):
    return {"Authorization": "Bearer {}".format(token)}


def auth_payload(token):
    return {
        "grant_type": "authorization_code",
        "code": str(token),
        "redirect_uri": REDIRECT_URI,
        "client_id": os.getenv('CLIENT_ID'),
        "client_secret": os.getenv('CLIENT_SECRET'),
    }


def get_user_profile(token):
    user_profile_api_endpoint = "{}/me".format(SPOTIFY_API_URL)
    profile_response = requests.get(
        user_profile_api_endpoint, headers=get_auth_header(token)
    )

    return json.loads(profile_response.text)


@bp.route("/redirect-spotify")
def index():
    url_args = "&".join([f"{key}={quote(val)}" for key, val in auth_query_parameters.items()])
    auth_url = f"{SPOTIFY_AUTH_URL}/?{url_args}"
    return auth_url


@bp.route('/user', methods=('GET', 'POST'))
def get_user():
    try:
        if request.method == 'POST':
            data = request.json
            auth_token = data['code']

            post_request = requests.post(SPOTIFY_TOKEN_URL, data=auth_payload(auth_token))

            response_data = json.loads(post_request.text)
            has_access_token = "access_token" in response_data
            current_app.logger.info(f"{type(response_data)} {has_access_token} {response_data}")
            access_token = response_data["access_token"]
            refresh_token = response_data["refresh_token"]

            session['access_token'] = access_token
            session['refresh_token'] = refresh_token

        access_token = session.get('access_token', None)

        profile_data = get_user_profile(access_token)

        if 'error' in profile_data:
            return 'Not logged in'

        session['user_id'] = profile_data['id']

        create_user(profile_data)

        res = make_response(jsonify(profile_data), 200)
        res.set_cookie('access_token', access_token)

        return res
    except Exception as e:
            current_app.logger.error(e)
            raise e


def create_user(data):
    db = get_db()

    if db.execute(
            'SELECT spotify_id FROM users WHERE spotify_id = ?', (data['id'],)
    ).fetchone() is None:
        db.execute(
            'INSERT INTO users (spotify_id, full_name, display_image) VALUES (?, ?, ?)',
            (data['id'], data['display_name'], data['images'][0]['url'])
        )
        db.commit()


@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute(
            'SELECT * FROM users WHERE spotify_id = ?', (user_id,)
        ).fetchone()


@bp.route('/logout')
def logout():
    session.clear()
    return 'True'
