from flask import Blueprint, request, jsonify
from sqlalchemy.exc import IntegrityError

from app import db
from app.models import User
from app.utils.validators import (
    is_valid_email,
    validate_required_fields,
    validate_non_empty_string,
)

users_bp = Blueprint("users", __name__, url_prefix="/users")


@users_bp.route("/", methods=["GET"])
def get_users():
    try:
        users = User.query.all()

        return jsonify(
            {
                "success": True,
                "message": "Users retrieved successfully",
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
    except Exception:
        return jsonify(
            {
                "success": False,
                "message": "An error occurred while retrieving users",
            }
        ), 500


@users_bp.route("/", methods=["POST"])
def create_user():
    data = request.get_json()

    is_valid, error_message = validate_required_fields(data, ["name", "email"])
    if not is_valid:
        return jsonify({"success": False, "message": error_message}), 400

    is_valid, error_message = validate_non_empty_string(data["name"], "Name")
    if not is_valid:
        return jsonify({"success": False, "message": error_message}), 400

    is_valid, error_message = validate_non_empty_string(data["email"], "Email")
    if not is_valid:
        return jsonify({"success": False, "message": error_message}), 400

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
    except Exception:
        db.session.rollback()
        return jsonify(
            {
                "success": False,
                "message": "An error occurred while creating the user",
            }
        ), 500


@users_bp.route("/<int:user_id>/orders", methods=["GET"])
def get_user_orders(user_id):
    try:
        user = User.query.get(user_id)

        if not user:
            return jsonify(
                {
                    "success": False,
                    "message": f"No user was found with user_id {user_id}",
                }
            ), 404

        return jsonify(
            {
                "success": True,
                "message": "User orders retrieved successfully",
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
    except Exception:
        return jsonify(
            {
                "success": False,
                "message": "An error occurred while retrieving user orders",
            }
        ), 500
