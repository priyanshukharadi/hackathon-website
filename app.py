from flask import Flask, render_template, request, jsonify
from database import get_connection

app = Flask(__name__)


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


    if not all([
        customer_name,
        email,
        phone,
        address,
        total
    ]):

        return jsonify({
            "success": False,
            "message": "All fields are required."
        }), 400


    try:

        total = float(total)

    except (TypeError, ValueError):

        return jsonify({
            "success": False,
            "message": "Invalid order total."
        }), 400


    connection = get_connection()


    cursor = connection.cursor()


    cursor.execute(
        """
        INSERT INTO orders
        (customer_name, email, phone, address, total)
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


    connection.commit()

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