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