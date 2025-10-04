from flask import Blueprint, jsonify, request
from app import db
from app.models import Order, User

orders_bp = Blueprint("orders", __name__, url_prefix="/orders")


@orders_bp.route("/", methods=["POST"])
def create_order():
    data = request.get_json()

    if (
        not data
        or "user_id" not in data
        or "product_name" not in data
        or "amount" not in data
    ):
        return jsonify({"success": False, "message": "All fields required"}), 400

    user = User.query.get(data["user_id"])
    if not user:
        return jsonify(
            {
                "success": False,
                "message": f"No user was found with ID# {data['user_id']}",
            }
        ), 404

    new_order = Order(
        user_id=data["user_id"],
        product_name=data["product_name"],
        amount=data["amount"],
    )

    db.session.add(new_order)
    db.session.commit()

    return jsonify(
        {
            "success": True,
            "message": "Order created",
            "data": {
                "id": new_order.id,
                "user_id": new_order.user_id,
                "product_name": new_order.product_name,
                "amount": new_order.amount,
                "created_at": new_order.created_at.isoformat(),
            },
        }
    ), 201


@orders_bp.route("/", methods=["GET"])
def get_orders():
    orders = Order.query.all()

    return jsonify(
        {
            "success": True,
            "data": [
                {
                    "id": order.id,
                    "product_name": order.product_name,
                    "amount": order.amount,
                    "created_at": order.created_at.isoformat(),
                    "user": {
                        "id": order.user.id,
                        "name": order.user.name,
                        "email": order.user.email,
                    },
                }
                for order in orders
            ],
        }
    ), 200
