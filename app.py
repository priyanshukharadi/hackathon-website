from flask import Flask, render_template
from database import get_connection

app = Flask(__name__)


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


@app.route("/cart")
def cart():

    return render_template("cart.html")


if __name__ == "__main__":
    app.run(debug=True)