from .models.error import Error
from flask import Blueprint, current_app, jsonify

errors = Blueprint('errors', __name__)

def create_error_response(error, status_code):
    current_app.logger.exception(error)
    success = "FAILURE"
    response = {
        'status': success,
        'error': {
            'type': Error.__name__,
            'message': "Unexpected exception"
        }
    }
    return jsonify(response), status_code

@errors.app_errorhandler(Error)
def handle_error(error):
    return create_error_response(error, 500)

@errors.app_errorhandler(Exception)
def handle_unexpected_error(error):
    return create_error_response(error, 500)
