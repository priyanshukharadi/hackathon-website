import sqlite3


DATABASE = "database/shop.db"


def get_connection():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


def create_database():

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            category TEXT NOT NULL,
            description TEXT,
            image TEXT
        )
    """)

    connection.commit()

    connection.close()


def add_products():

    connection = get_connection()

    cursor = connection.cursor()

    products = [
        (
            "Smartphone",
            19999,
            "Electronics",
            "A modern smartphone with a high-quality display.",
            "📱"
        ),
        (
            "Wireless Headphones",
            2499,
            "Electronics",
            "Comfortable wireless headphones with clear sound.",
            "🎧"
        ),
        (
            "Casual T-Shirt",
            599,
            "Clothing",
            "Comfortable cotton t-shirt for everyday use.",
            "👕"
        ),
        (
            "Running Shoes",
            1999,
            "Shoes",
            "Lightweight running shoes for daily workouts.",
            "👟"
        ),
        (
            "Programming Book",
            799,
            "Books",
            "A beginner-friendly programming book.",
            "📚"
        ),
        (
            "Coffee Mug",
            299,
            "Home",
            "Simple ceramic coffee mug.",
            "☕"
        ),
        (
            "Travel Backpack",
            1499,
            "Accessories",
            "Durable backpack suitable for travel and college.",
            "🎒"
        ),
        (
            "Smart Watch",
            3499,
            "Electronics",
            "Smart watch with fitness tracking features.",
            "⌚"
        )
    ]

    cursor.executemany("""
        INSERT INTO products
        (name, price, category, description, image)
        VALUES (?, ?, ?, ?, ?)
    """, products)

    connection.commit()

    connection.close()


if __name__ == "__main__":

    create_database()

    add_products()

    print("Database and products created successfully! 🛒")