import logging

from .models.error import Error
from flask import Blueprint, current_app, jsonify

errors = Blueprint('errors', __name__)


@errors.app_errorhandler(Error)
def handle_error(error):
    current_app.logger.exception(error)
    message = [str(x) for x in error.args]
    status_code = 500
    success = "FAILURE"
    response = {
        'status': success,
        'error': {
            'type': error.__class__.__name__,
            'message': message
        }
    }

    return jsonify(response), status_code


@errors.app_errorhandler(Exception)
def handle_unexpected_error(error):
    current_app.logger.exception(error)
    status_code = 500
    success = "FAILURE"
    response = {
        'status': success,
        'error': {
            'type': 'UnexpectedException',
            'message': 'An unexpected error has occurred.'
        }
    }

    return jsonify(response), status_code
