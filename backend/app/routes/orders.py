from flask import Blueprint

orders_bp = Blueprint('orders', __name__, url_prefix='/orders')

@orders_bp.route('/', methods=['POST'])
def create_order():
    pass

@orders_bp.route('/', methods=['GET'])
def get_orders():
    pass