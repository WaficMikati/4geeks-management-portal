import pytest
from app import create_app


@pytest.fixture
def client():
    app = create_app("development")
    return app.test_client()


class TestOrders:
    def test_get_orders(self, client):
        response = client.get("/api/orders/")
        assert response.status_code == 200
        data = response.get_json()
        assert data["success"] is True
        assert "data" in data
        assert isinstance(data["data"], list)

        if len(data["data"]) > 0:
            order = data["data"][0]
            assert "id" in order
            assert "quantity" in order
            assert "amount" in order
            assert "created_at" in order
            assert "product" in order
            assert "user" in order
            assert "id" in order["product"]
            assert "name" in order["product"]
            assert "price" in order["product"]
            assert "id" in order["user"]
            assert "name" in order["user"]
            assert "email" in order["user"]

    def test_dashboard_endpoint(self, client):
        response = client.get("/api/")
        assert response.status_code == 200
        data = response.get_json()
        assert data["success"] is True
        assert "stats" in data
        assert "total_users" in data["stats"]
        assert "total_products" in data["stats"]
        assert "total_orders" in data["stats"]
        assert "total_amount" in data["stats"]
        assert isinstance(data["stats"]["total_users"], int)
        assert isinstance(data["stats"]["total_products"], int)
        assert isinstance(data["stats"]["total_orders"], int)
        assert isinstance(data["stats"]["total_amount"], (int, float))

    def test_health_check(self, client):
        response = client.get("/health")
        assert response.status_code == 200
        data = response.get_json()
        assert data["success"] is True
        assert "message" in data
