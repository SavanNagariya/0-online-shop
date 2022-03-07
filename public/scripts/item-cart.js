const itemsFormElements = document.querySelectorAll(".item-data");
const cartTotalPrice = document.getElementById("total-price");
const cartTotalQuantity = document.querySelector(".cartItem");

updateItemCart = async (event) => {
  event.preventDefault();

  const form = event.target;
  const productId = form.dataset.productid;
  const csrf = form.dataset.csrf;
  const quantity = form.firstElementChild.value;

  let resp;
  try {
    resp = await fetch("/shopping-cart", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
        _csrf: csrf,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("something went wrong");
    return;
  }
  if (!resp.ok) {
    alert("something went wrong");
    return;
  }
  const responseData = await resp.json();

  const cartItemTotalPrice = form.parentElement.querySelector(".item-price");
  cartItemTotalPrice.textContent =
    responseData.updateCartData.updatedItemPrice.toFixed(2);

  cartTotalPrice.textContent =
    responseData.updateCartData.newTotalPrice.toFixed(2);

  cartTotalQuantity.textContent = responseData.updateCartData.newTotalQuantity;
};

for (const itemForm of itemsFormElements) {
  itemForm.addEventListener("submit", updateItemCart);
}
