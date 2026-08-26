import sqlite3


DATABASE = "database/shop.db"


# =========================
# DATABASE CONNECTION
# =========================

def get_connection():

    connection = sqlite3.connect(DATABASE)

    connection.row_factory = sqlite3.Row

    return connection


# =========================
# CREATE PRODUCTS TABLE
# =========================

def create_database():

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL,
            description TEXT NOT NULL,
            image TEXT NOT NULL
        )
    """)

    connection.commit()

    connection.close()


# =========================
# CREATE ORDERS TABLE
# =========================

def create_orders_table():

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT NOT NULL,
            total REAL NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    connection.commit()

    connection.close()


# =========================
# CREATE ORDER ITEMS TABLE
# =========================

def create_order_items_table():

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS order_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            product_name TEXT NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders(id)
        )
    """)

    connection.commit()

    connection.close()


# =========================
# ADD PRODUCTS
# =========================

def add_products():

    connection = get_connection()

    cursor = connection.cursor()


    products = [

        (
            "Smartphone",
            "Electronics",
            19999,
            "A modern smartphone with a high-quality display.",
            "📱"
        ),

        (
            "Wireless Headphones",
            "Electronics",
            2999,
            "Enjoy music with wireless headphones.",
            "🎧"
        ),

        (
            "Casual T-Shirt",
            "Clothing",
            599,
            "Comfortable cotton casual T-shirt.",
            "👕"
        ),

        (
            "Running Shoes",
            "Shoes",
            2499,
            "Lightweight shoes designed for running.",
            "👟"
        ),

        (
            "Programming Book",
            "Books",
            899,
            "Learn programming fundamentals.",
            "📚"
        ),

        (
            "Coffee Mug",
            "Home",
            299,
            "A stylish mug for your daily coffee.",
            "☕"
        ),

        (
            "Travel Backpack",
            "Accessories",
            1499,
            "A durable backpack for travel and everyday use.",
            "🎒"
        ),

        (
            "Smart Watch",
            "Electronics",
            4999,
            "Track your activities with a smart watch.",
            "⌚"
        )

    ]


    cursor.executemany("""
        INSERT INTO products
        (name, category, price, description, image)
        VALUES (?, ?, ?, ?, ?)
    """, products)


    connection.commit()

    connection.close()


# =========================
# DATABASE SETUP
# =========================

if __name__ == "__main__":

    create_database()

    create_orders_table()

    create_order_items_table()

    print(
        "Database and order items table ready! 🗄️"
    )