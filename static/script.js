let cart = JSON.parse(localStorage.getItem("cart")) || [];


// =========================
// SAVE CART
// =========================

function saveCart() {
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}


// =========================
// ADD TO CART
// =========================

function addToCart(product) {

    const existingProduct = cart.find(
        item => item.id === product.id
    );

    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.image,
            quantity: 1
        });

    }

    saveCart();

    updateCartCount();
}


// =========================
// UPDATE CART COUNT
// =========================

function updateCartCount() {

    let totalQuantity = 0;

    cart.forEach(function(product) {

        totalQuantity += Number(
            product.quantity
        );

    });

    const cartCount =
        document.getElementById("cart-count");

    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }
}


// =========================
// DISPLAY CART
// =========================

function displayCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");

    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <h2>Your cart is empty 😭</h2>

                <p>
                    Add some products to your cart.
                </p>

                <a href="/">
                    <button>
                        Continue Shopping
                    </button>
                </a>

            </div>
        `;

        cartTotal.textContent = "₹0";

        return;
    }


    cart.forEach(function(product, index) {

        const price =
            Number(product.price);

        const quantity =
            Number(product.quantity);

        const productTotal =
            price * quantity;

        total += productTotal;


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-product-image">
                ${product.image}
            </div>

            <div class="cart-product-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ₹${price}
                </p>

            </div>

            <div class="quantity-controls">

                <button
                    onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span>
                    ${quantity}
                </span>

                <button
                    onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>

            <div class="cart-product-total">
                ₹${productTotal}
            </div>

            <button
                class="remove-button"
                onclick="removeFromCart(${index})">

                Remove

            </button>

        `;

        cartItems.appendChild(cartItem);

    });


    cartTotal.textContent =
        "₹" + total;
}


// =========================
// INCREASE QUANTITY
// =========================

function increaseQuantity(index) {

    cart[index].quantity =
        Number(cart[index].quantity) + 1;

    saveCart();

    displayCart();

    updateCartCount();
}


// =========================
// DECREASE QUANTITY
// =========================

function decreaseQuantity(index) {

    if (
        Number(cart[index].quantity) > 1
    ) {

        cart[index].quantity =
            Number(cart[index].quantity) - 1;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

    displayCart();

    updateCartCount();
}


// =========================
// REMOVE PRODUCT
// =========================

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

    updateCartCount();
}


// =========================
// SHOP NOW
// =========================

function scrollToProducts() {

    const productsSection =
        document.getElementById("products");

    if (productsSection) {

        productsSection.scrollIntoView({
            behavior: "smooth"
        });

    }
}


// =========================
// HOMEPAGE ADD TO CART
// =========================

const cartButtons =
    document.querySelectorAll(
        ".add-to-cart-button"
    );


cartButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const product = {

                id: Number(
                    button.dataset.id
                ),

                name:
                    button.dataset.name,

                price: Number(
                    button.dataset.price
                ),

                image:
                    button.dataset.image

            };

            addToCart(product);

        }
    );

});


// =========================
// PRODUCT DETAILS ADD TO CART
// =========================

const detailsCartButton =
    document.querySelector(
        ".details-cart-button"
    );


if (detailsCartButton) {

    detailsCartButton.addEventListener(
        "click",
        function() {

            const product = {

                id: Number(
                    detailsCartButton.dataset.id
                ),

                name:
                    detailsCartButton.dataset.name,

                price: Number(
                    detailsCartButton.dataset.price
                ),

                image:
                    detailsCartButton.dataset.image

            };

            addToCart(product);

        }
    );

}


// =========================
// SHOP NOW BUTTON
// =========================

const shopNowButton =
    document.getElementById(
        "shop-now-button"
    );


if (shopNowButton) {

    shopNowButton.addEventListener(
        "click",
        scrollToProducts
    );

}


// =========================
// PAGE LOAD
// =========================

updateCartCount();

displayCart();

// =========================
// PRODUCT SEARCH
// =========================

const searchInput =
    document.getElementById(
        "product-search"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        function() {

            const searchText =
                searchInput.value
                    .toLowerCase()
                    .trim();


            const productCards =
                document.querySelectorAll(
                    ".product-card"
                );


            productCards.forEach(
                function(card) {

                    const productName =
                        card
                            .querySelector("h3")
                            .textContent
                            .toLowerCase();


                    const category =
                        card
                            .querySelector(".category")
                            .textContent
                            .toLowerCase();


                    const description =
                        card
                            .querySelector(
                                "p:not(.category):not(.price)"
                            )
                            .textContent
                            .toLowerCase();


                    const matches =
                        productName.includes(
                            searchText
                        ) ||
                        category.includes(
                            searchText
                        ) ||
                        description.includes(
                            searchText
                        );


                    if (matches) {

                        card.style.display =
                            "";

                    } else {

                        card.style.display =
                            "none";

                    }

                }
            );

        }
    );

}
// =========================
// CATEGORY FILTER
// =========================

const categoryCards =
    document.querySelectorAll(
        ".category-card"
    );


categoryCards.forEach(function(card) {

    card.addEventListener(
        "click",
        function() {

            const selectedCategory =
                card.dataset.category;


            const productCards =
                document.querySelectorAll(
                    ".product-card"
                );


            productCards.forEach(
                function(productCard) {

                    const productCategory =
                        productCard
                            .querySelector(
                                ".category"
                            )
                            .textContent
                            .trim();


                    if (
                        selectedCategory === "All" ||
                        productCategory ===
                        selectedCategory
                    ) {

                        productCard.style.display =
                            "";

                    } else {

                        productCard.style.display =
                            "none";

                    }

                }
            );


            // Scroll to products

            const productsSection =
                document.getElementById(
                    "products"
                );


            if (productsSection) {

                productsSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

});
// =========================
// CHECKOUT SUMMARY
// =========================

function displayCheckout() {

    const checkoutItems =
        document.getElementById(
            "checkout-items"
        );

    const checkoutTotal =
        document.getElementById(
            "checkout-total"
        );


    if (!checkoutItems) {
        return;
    }


    checkoutItems.innerHTML = "";


    let total = 0;


    // Empty cart

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p>
                Your cart is empty.
            </p>

            <a href="/">
                Continue Shopping
            </a>
        `;

        checkoutTotal.textContent = "₹0";

        return;
    }


    // Display products

    cart.forEach(function(product) {

        const price =
            Number(product.price);

        const quantity =
            Number(product.quantity);

        const productTotal =
            price * quantity;


        total += productTotal;


        const checkoutItem =
            document.createElement("div");


        checkoutItem.className =
            "checkout-item";


        checkoutItem.innerHTML = `

            <div class="checkout-item-image">
                ${product.image}
            </div>


            <div class="checkout-item-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ₹${price} × ${quantity}
                </p>

            </div>


            <div class="checkout-item-price">

                ₹${productTotal}

            </div>

        `;


        checkoutItems.appendChild(
            checkoutItem
        );

    });


    checkoutTotal.textContent =
        "₹" + total;

}


// Load checkout summary

displayCheckout();
// =========================
// PLACE ORDER
// =========================

const checkoutForm =
    document.getElementById(
        "checkout-form"
    );


if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            const customerName =
                document.getElementById(
                    "customer-name"
                ).value.trim();


            const email =
                document.getElementById(
                    "customer-email"
                ).value.trim();


            const phone =
                document.getElementById(
                    "customer-phone"
                ).value.trim();


            const address =
                document.getElementById(
                    "customer-address"
                ).value.trim();


            let total = 0;


            cart.forEach(function(product) {

                total +=
                    Number(product.price) *
                    Number(product.quantity);

            });


            const orderData = {

                customer_name:
                    customerName,

                email:
                    email,

                phone:
                    phone,

                address:
                    address,

                total:
                    total,
                items:
                    cart 

            };


            try {

                const response =
                    await fetch(
                        "/api/orders",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    orderData
                                )
                        }
                    );


                const result =
                    await response.json();


                if (result.success) {

                    // Empty cart

                    cart = [];

                    saveCart();

                    updateCartCount();

                    displayCheckout();


                    // Go to order confirmation

                     window.location.href =
                         "/order-success/" +
                         result.order_id;

                } else {

                    alert(
                        result.message
                    );

                }

            } catch (error) {

                console.error(
                    "Order error:",
                    error
                );


                alert(
                    "Something went wrong while placing your order."
                );

            }

        }
    );

}