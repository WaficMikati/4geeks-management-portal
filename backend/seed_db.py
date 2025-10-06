from app import create_app, db
from app.models import User, Order, Product
from faker import Faker
import random

fake = Faker()
app = create_app()

with app.app_context():
    if User.query.first() is not None:
        print("Database already has data. Skipping seed.")
        exit(0)

    print("Seeding database...")

    Order.query.delete()
    User.query.delete()
    Product.query.delete()

    users = []
    for _ in range(60):
        user = User(name=fake.name(), email=fake.unique.email())
        users.append(user)
        db.session.add(user)

    db.session.commit()

    products_data = [
        ("Laptop", 999.99),
        ("Mouse", 29.99),
        ("Keyboard", 79.99),
        ("Monitor", 299.99),
        ("Headphones", 149.99),
        ("Webcam", 89.99),
        ("Microphone", 129.99),
        ("Desk", 399.99),
        ("Chair", 449.99),
        ("USB Cable", 12.99),
    ]

    products = []
    for name, price in products_data:
        product = Product(name=name, price=price)
        products.append(product)
        db.session.add(product)

    db.session.commit()

    for _ in range(50):
        order = Order(
            user_id=random.choice(users).id,
            product_id=random.choice(products).id,
            quantity=random.randint(1, 5),
            amount=round(random.uniform(10, 1000), 2),
        )
        db.session.add(order)

    db.session.commit()

    print("Database seeded!")
    print(f"Created {len(users)} users, {len(products)} products, and 50 orders")
