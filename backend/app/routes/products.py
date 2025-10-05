from flask import Blueprint, jsonify, request
from sqlalchemy.exc import IntegrityError

from app import db
from app.models import Product
from app.utils.validators import (
    validate_required_fields,
    validate_non_empty_string,
    validate_positive_number,
)

products_bp = Blueprint("products", __name__, url_prefix="/products")


@products_bp.route("/", methods=["GET"])
def get_products():
    try:
        products = Product.query.all()

        return jsonify(
            {
                "success": True,
                "message": "Products retrieved successfully",
                "data": [
                    {
                        "id": product.id,
                        "name": product.name,
                        "price": product.price,
                        "created_at": product.created_at.isoformat(),
                    }
                    for product in products
                ],
            }
        ), 200
    except Exception:
        return jsonify(
            {
                "success": False,
                "message": "An error occurred while retrieving products",
            }
        ), 500


@products_bp.route("/", methods=["POST"])
def create_product():
    data = request.get_json()

    is_valid, error_message = validate_required_fields(data, ["name", "price"])
    if not is_valid:
        return jsonify({"success": False, "message": error_message}), 400

    is_valid, error_message = validate_non_empty_string(data["name"], "Name")
    if not is_valid:
        return jsonify({"success": False, "message": error_message}), 400

    is_valid, price = validate_positive_number(data["price"], "Price")
    if not is_valid:
        return jsonify({"success": False, "message": price}), 400

    try:
        new_product = Product(name=data["name"], price=price)

        db.session.add(new_product)
        db.session.commit()

        return jsonify(
            {
                "success": True,
                "message": "Product created successfully",
                "data": {
                    "id": new_product.id,
                    "name": new_product.name,
                    "price": new_product.price,
                    "created_at": new_product.created_at.isoformat(),
                },
            }
        ), 201

    except IntegrityError:
        db.session.rollback()
        return jsonify(
            {
                "success": False,
                "message": "A product with this name already exists",
            }
        ), 409
    except Exception:
        db.session.rollback()
        return jsonify(
            {
                "success": False,
                "message": "An error occurred while creating the product",
            }
        ), 500
