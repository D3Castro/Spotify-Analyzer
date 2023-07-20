import os

from flask import Flask

from flask_cors import CORS

from .cache import cache


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        DEBUG=True,
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )
    cache.init_app(app)

    CORS(app)

    if test_config is None:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from . import db
    db.init_app(app)

    from .errors import errors
    app.register_blueprint(errors)

    from . import auth
    from . import user
    app.register_blueprint(auth.bp)
    app.register_blueprint(user.bp)

    return app
