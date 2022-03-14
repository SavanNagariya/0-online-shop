const addCartButtonElement = document.querySelector("#add-item");
const cartCountElement = document.querySelector(".cartItem");

addToCart = async () => {
  const productId = addCartButtonElement.dataset.productid;
  const csrf = addCartButtonElement.dataset.csrf;
  let resp;
  try {
    resp = await fetch("/shopping-cart", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        _csrf: csrf,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Something went Wrong");
    return;
  }

  if (!resp.ok) {
    alert("Something went Wrong");
    return;
  }

  const responseData = await resp.json();
  const newTotalQuantity = responseData.newTotalItem;
  cartCountElement.textContent = newTotalQuantity;
};

addCartButtonElement.addEventListener("click", addToCart);
