from flask import Blueprint, jsonify
from app import db
from app.models import User, Order, Product
from app.routes import users, orders, products

main_bp = Blueprint("main", __name__, url_prefix="/api")

main_bp.register_blueprint(users.users_bp)
main_bp.register_blueprint(orders.orders_bp)
main_bp.register_blueprint(products.products_bp)


@main_bp.route("/", methods=["GET"])
def dashboard():
    try:
        total_users = db.session.query(User).count()
        total_products = db.session.query(Product).count()
        total_orders = db.session.query(Order).count()
        total_amount = db.session.query(db.func.sum(Order.amount)).scalar() or 0

        return jsonify(
            {
                "success": True,
                "message": "Dashboard data retrieved successfully",
                "stats": {
                    "total_users": total_users,
                    "total_products": total_products,
                    "total_orders": total_orders,
                    "total_amount": float(total_amount),
                },
            }
        ), 200
    except Exception:
        return jsonify(
            {
                "success": False,
                "message": "An error occurred while retrieving dashboard data",
            }
        ), 500
