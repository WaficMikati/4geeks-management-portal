import pytest
from app import create_app


@pytest.fixture
def client():
    app = create_app("development")
    return app.test_client()


class TestProducts:
    def test_get_products(self, client):
        response = client.get("/api/products/")
        assert response.status_code == 200
        data = response.get_json()
        assert data["success"] is True
        assert "data" in data
        assert isinstance(data["data"], list)

        if len(data["data"]) > 0:
            product = data["data"][0]
            assert "id" in product
            assert "name" in product
            assert "price" in product
            assert "created_at" in product
