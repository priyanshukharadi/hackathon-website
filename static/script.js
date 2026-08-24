let cartCount = 0;


function addToCart() {

    cartCount++;

    document.getElementById("cart-count").textContent = cartCount;

    alert("Product added to cart! 🛒");

}


function scrollToProducts() {

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });

}