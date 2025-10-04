from flask import Blueprint, jsonify, request

main_bp = Blueprint('main', __name__, url_prefix='/api')

@main_bp.route('/', methods=['GET'])
def dashboard():
    pass

from app.routes import users, orders

main_bp.register_blueprint(users.users_bp)
main_bp.register_blueprint(orders.orders_bp)