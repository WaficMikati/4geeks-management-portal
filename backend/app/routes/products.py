from flask import Blueprint, jsonify, request
from app import db
from app.models import Product
from sqlalchemy.exc import IntegrityError

products_bp = Blueprint("products", __name__, url_prefix="/products")


@products_bp.route("/", methods=["GET"])
def get_products():
    products = Product.query.all()

    return jsonify(
        {
            "success": True,
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


@products_bp.route("/", methods=["POST"])
def create_product():
    data = request.get_json()

    if not data or "name" not in data or "price" not in data:
        return jsonify(
            {
                "success": False,
                "message": "Name and price are both required",
            }
        ), 400

    if not data["name"].strip():
        return jsonify(
            {
                "success": False,
                "message": "Name cannot be empty",
            }
        ), 400

    try:
        price = float(data["price"])
        if price <= 0:
            return jsonify(
                {
                    "success": False,
                    "message": "Price must be greater than zero",
                }
            ), 400
    except (ValueError, TypeError):
        return jsonify(
            {
                "success": False,
                "message": "Price must be a valid number",
            }
        ), 400

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
