import pytest
from app import create_app


@pytest.fixture
def client():
    app = create_app("development")
    return app.test_client()


class TestUsers:
    def test_get_users(self, client):
        response = client.get("/api/users/")
        assert response.status_code == 200
        data = response.get_json()
        assert data["success"] is True
        assert "data" in data
        assert isinstance(data["data"], list)

    def test_get_user_orders(self, client):
        response = client.get("/api/users/1/orders")
        assert response.status_code in [200, 404]
        data = response.get_json()
        assert data["success"] is not None

        if response.status_code == 200:
            assert "data" in data
            assert "user" in data["data"]
            assert "orders" in data["data"]

    def test_get_nonexistent_user_orders(self, client):
        response = client.get("/api/users/999999/orders")
        assert response.status_code == 404
        data = response.get_json()
        assert data["success"] is False
        assert "message" in data
