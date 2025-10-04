from app import create_app, db
from app.models import User, Order
from faker import Faker
import random

fake = Faker()
app = create_app()

with app.app_context():
    Order.query.delete()
    User.query.delete()

    users = []
    for _ in range(60):
        user = User(name=fake.name(), email=fake.unique.email())
        users.append(user)
        db.session.add(user)

    db.session.commit()

    products = [
        "Laptop",
        "Mouse",
        "Keyboard",
        "Monitor",
        "Headphones",
        "Webcam",
        "Microphone",
        "Desk",
        "Chair",
        "USB Cable",
    ]

    for _ in range(50):
        order = Order(
            user_id=random.choice(users).id,
            product_name=random.choice(products),
            amount=round(random.uniform(10, 1000), 2),
        )
        db.session.add(order)

    db.session.commit()

    print("Database seeded!")
    print(f"Created {len(users)} users and 50 orders")
