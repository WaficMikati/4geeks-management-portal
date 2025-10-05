from flask import Blueprint, request, jsonify
from app import db
from app.models import User
from sqlalchemy.exc import IntegrityError
import re

users_bp = Blueprint("users", __name__, url_prefix="/users")


def is_valid_email(email):
    pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    return re.match(pattern, email) is not None


@users_bp.route("/", methods=["GET"])
def get_users():
    users = User.query.all()

    return jsonify(
        {
            "success": True,
            "data": [
                {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                    "created_at": user.created_at.isoformat(),
                }
                for user in users
            ],
        }
    ), 200


@users_bp.route("/", methods=["POST"])
def create_user():
    data = request.get_json()

    if not data or "name" not in data or "email" not in data:
        return jsonify(
            {
                "success": False,
                "message": "Name and email are both required",
            }
        ), 400

    if not data["name"].strip() or not data["email"].strip():
        return jsonify(
            {
                "success": False,
                "message": "Name and email cannot be empty",
            }
        ), 400

    if not is_valid_email(data["email"]):
        return jsonify(
            {
                "success": False,
                "message": "Invalid email format",
            }
        ), 400

    try:
        new_user = User(name=data["name"], email=data["email"])

        db.session.add(new_user)
        db.session.commit()

        return jsonify(
            {
                "success": True,
                "message": "User created successfully",
                "data": {
                    "id": new_user.id,
                    "name": new_user.name,
                    "email": new_user.email,
                    "created_at": new_user.created_at.isoformat(),
                },
            }
        ), 201

    except IntegrityError:
        db.session.rollback()
        return jsonify(
            {
                "success": False,
                "message": "A user with this email already exists",
            }
        ), 409


@users_bp.route("/<int:user_id>/orders", methods=["GET"])
def get_user_orders(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify(
            {"success": False, "message": f"No user was found with ID# {user_id}"}
        ), 404

    return jsonify(
        {
            "success": True,
            "data": {
                "user": {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                    "created_at": user.created_at.isoformat(),
                },
                "orders": [
                    {
                        "id": order.id,
                        "product_name": order.product.name,
                        "quantity": order.quantity,
                        "amount": order.amount,
                        "created_at": order.created_at.isoformat(),
                    }
                    for order in user.orders
                ],
            },
        }
    ), 200
