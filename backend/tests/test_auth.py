"""
Integration tests for auth endpoints.
Uses in-memory SQLite DB.
"""
import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

from app.main import app
from app.database import Base, get_db

TEST_DB_URL = "sqlite+aiosqlite:///./test_vulnexus.db"
test_engine = create_async_engine(TEST_DB_URL, echo=False)
TestSessionLocal = async_sessionmaker(test_engine, expire_on_commit=False)


async def override_get_db():
    async with TestSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()


@pytest_asyncio.fixture(autouse=True)
async def setup_db():
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    app.dependency_overrides[get_db] = override_get_db
    yield
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    app.dependency_overrides.clear()


@pytest.mark.asyncio
async def test_register_and_login():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        # Register
        resp = await client.post(
            "/api/auth/register",
            json={"username": "tester", "email": "tester@test.com", "password": "securepass123"},
        )
        assert resp.status_code == 201
        data = resp.json()
        assert "access_token" in data
        assert data["user"]["username"] == "tester"
        token = data["access_token"]

        # Login
        resp = await client.post(
            "/api/auth/login",
            json={"username": "tester", "password": "securepass123"},
        )
        assert resp.status_code == 200
        assert "access_token" in resp.json()

        # /me
        resp = await client.get(
            "/api/auth/me",
            headers={"Authorization": f"Bearer {token}"},
        )
        assert resp.status_code == 200
        assert resp.json()["username"] == "tester"


@pytest.mark.asyncio
async def test_register_duplicate_username():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        await client.post(
            "/api/auth/register",
            json={"username": "dupe", "email": "first@test.com", "password": "securepass123"},
        )
        resp = await client.post(
            "/api/auth/register",
            json={"username": "dupe", "email": "second@test.com", "password": "securepass123"},
        )
        assert resp.status_code == 400
        assert "Username" in resp.json()["detail"]


@pytest.mark.asyncio
async def test_login_wrong_password():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        await client.post(
            "/api/auth/register",
            json={"username": "user2", "email": "user2@test.com", "password": "correctpass"},
        )
        resp = await client.post(
            "/api/auth/login",
            json={"username": "user2", "password": "wrongpassword"},
        )
        assert resp.status_code == 401


@pytest.mark.asyncio
async def test_me_without_token():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        resp = await client.get("/api/auth/me")
        assert resp.status_code == 401
