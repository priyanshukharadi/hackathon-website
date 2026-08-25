from flask import Flask, render_template
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

if __name__ == "__main__":
    app.run(debug=True)