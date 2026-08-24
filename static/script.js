let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Add product to cart
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
            price: product.price,
            image: product.image,
            quantity: 1
        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();

    alert(product.name + " added to cart! 🛒");
}


// Update cart number
function updateCartCount() {

    let totalQuantity = 0;


    cart.forEach(function(product) {

        totalQuantity += product.quantity;

    });


    const cartCount = document.getElementById("cart-count");


    if (cartCount) {

        cartCount.textContent = totalQuantity;

    }
}


// Shop Now button
function scrollToProducts() {

    const productsSection =
        document.getElementById("products");


    if (productsSection) {

        productsSection.scrollIntoView({
            behavior: "smooth"
        });

    }
}


// Add click events to product buttons
const cartButtons =
    document.querySelectorAll(".add-to-cart-button");


cartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const product = {

            id: Number(button.dataset.id),

            name: button.dataset.name,

            price: Number(button.dataset.price),

            image: button.dataset.image

        };


        addToCart(product);

    });

});


// Shop Now button event
const shopNowButton =
    document.getElementById("shop-now-button");


if (shopNowButton) {

    shopNowButton.addEventListener(
        "click",
        scrollToProducts
    );

}


// Load cart count when page opens
updateCartCount();