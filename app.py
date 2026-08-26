from flask import Flask, render_template, request, jsonify

from database import (
    get_connection,
    initialize_database
)


app = Flask(__name__)


initialize_database()


# =========================
# HOME PAGE
# =========================

@app.route("/")
def home():

    connection = get_connection()

    products = connection.execute(
        "SELECT * FROM products"
    ).fetchall()

    connection.close()

    return render_template(
        "index.html",
        products=products
    )


# =========================
# CART PAGE
# =========================

@app.route("/cart")
def cart():

    return render_template("cart.html")

@app.route("/checkout")
def checkout():

    return render_template("checkout.html")


# =========================
# PRODUCT DETAILS PAGE
# =========================

@app.route("/product/<int:product_id>")
def product_details(product_id):

    connection = get_connection()

    product = connection.execute(
        "SELECT * FROM products WHERE id = ?",
        (product_id,)
    ).fetchone()

    connection.close()

    if product is None:
        return "Product not found", 404

    return render_template(
        "product.html",
        product=product
    )


# =========================
# START SERVER
# =========================

@app.route("/api/orders", methods=["POST"])
def create_order():

    data = request.get_json()


    if not data:

        return jsonify({
            "success": False,
            "message": "No order data received."
        }), 400


    customer_name = data.get("customer_name")
    email = data.get("email")
    phone = data.get("phone")
    address = data.get("address")
    total = data.get("total")
    items = data.get("items")


    # Validate customer information

    if not all([
        customer_name,
        email,
        phone,
        address,
        total,
        items
    ]):

        return jsonify({
            "success": False,
            "message": "All order information is required."
        }), 400


    # Validate total

    try:

        total = float(total)

    except (TypeError, ValueError):

        return jsonify({
            "success": False,
            "message": "Invalid order total."
        }), 400


    # Validate cart

    if not isinstance(items, list) or len(items) == 0:

        return jsonify({
            "success": False,
            "message": "Your cart is empty."
        }), 400


    connection = get_connection()

    cursor = connection.cursor()


    try:

        # -------------------------
        # CREATE ORDER
        # -------------------------

        cursor.execute(
            """
            INSERT INTO orders
            (
                customer_name,
                email,
                phone,
                address,
                total
            )
            VALUES (?, ?, ?, ?, ?)
            """,
            (
                customer_name,
                email,
                phone,
                address,
                total
            )
        )


        order_id = cursor.lastrowid


        # -------------------------
        # CREATE ORDER ITEMS
        # -------------------------

        for item in items:

            product_id = item.get("id")
            product_name = item.get("name")
            price = item.get("price")
            quantity = item.get("quantity")


            if not all([
                product_id,
                product_name,
                price,
                quantity
            ]):

                raise ValueError(
                    "Invalid product information."
                )


            cursor.execute(
                """
                INSERT INTO order_items
                (
                    order_id,
                    product_id,
                    product_name,
                    price,
                    quantity
                )
                VALUES (?, ?, ?, ?, ?)
                """,
                (
                    order_id,
                    product_id,
                    product_name,
                    float(price),
                    int(quantity)
                )
            )


        connection.commit()


    except Exception as error:

        connection.rollback()

        connection.close()

        print("Order error:", error)


        return jsonify({
            "success": False,
            "message": "Could not save the order."
        }), 500


    connection.close()


    return jsonify({
        "success": True,
        "order_id": order_id,
        "message": "Order placed successfully!"
    })
@app.route("/order-success/<int:order_id>")
def order_success(order_id):

    return render_template(
        "order_success.html",
        order_id=order_id
    )

if __name__ == "__main__":
    app.run(debug=True)