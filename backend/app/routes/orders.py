from flask import Blueprint, jsonify, request

from app import db
from app.models import Order, User, Product
from app.utils.validators import validate_required_fields

orders_bp = Blueprint("orders", __name__, url_prefix="/orders")


@orders_bp.route("/", methods=["POST"])
def create_order():
    data = request.get_json()

    is_valid, error_message = validate_required_fields(
        data, ["user_id", "product_id", "amount"]
    )
    if not is_valid:
        return jsonify({"success": False, "message": error_message}), 400

    try:
        user = User.query.get(data["user_id"])
        if not user:
            return jsonify(
                {
                    "success": False,
                    "message": f"No user was found with user_id {data['user_id']}",
                }
            ), 404

        product = Product.query.get(data["product_id"])
        if not product:
            return jsonify(
                {
                    "success": False,
                    "message": f"No product was found with product_id {data['product_id']}",
                }
            ), 404

        quantity = data.get("quantity", 1)

        new_order = Order(
            user_id=data["user_id"],
            product_id=data["product_id"],
            quantity=quantity,
            amount=data["amount"],
        )

        db.session.add(new_order)
        db.session.commit()

        return jsonify(
            {
                "success": True,
                "message": "Order created successfully",
                "data": {
                    "id": new_order.id,
                    "user_id": new_order.user_id,
                    "product_id": new_order.product_id,
                    "quantity": new_order.quantity,
                    "amount": new_order.amount,
                    "created_at": new_order.created_at.isoformat(),
                },
            }
        ), 201
    except Exception:
        db.session.rollback()
        return jsonify(
            {
                "success": False,
                "message": "An error occurred while creating the order",
            }
        ), 500


@orders_bp.route("/", methods=["GET"])
def get_orders():
    try:
        orders = Order.query.all()

        return jsonify(
            {
                "success": True,
                "message": "Orders retrieved successfully",
                "data": [
                    {
                        "id": order.id,
                        "quantity": order.quantity,
                        "amount": order.amount,
                        "created_at": order.created_at.isoformat(),
                        "product": {
                            "id": order.product.id,
                            "name": order.product.name,
                            "price": order.product.price,
                        },
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
    except Exception:
        return jsonify(
            {
                "success": False,
                "message": "An error occurred while retrieving orders",
            }
        ), 500
