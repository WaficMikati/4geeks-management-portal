from flask import Blueprint

users_bp = Blueprint('users', __name__, url_prefix='/users')

@users_bp.route('/', methods=['POST'])
def create_user():
    pass

@users_bp.route('/', methods=['GET'])
def get_users():
    pass

@users_bp.route('/<int:user_id>/orders', methods=['GET'])
def get_user_orders(user_id):
    pass