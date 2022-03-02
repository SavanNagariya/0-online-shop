const deleteProductElements = document.querySelectorAll("#deleteButton");

deleteProduct = async (event) => {
  const buttonElement = event.target;
  const productId = buttonElement.dataset.productid;
  const csrf = buttonElement.dataset.csrf;

  const res = await fetch("/admin/products/" + productId + "?_csrf=" + csrf, {
    method: "DELETE",
  });

  if (!res.ok) {
    alert("something is wrong");
    return;
  }

  buttonElement.parentElement.parentElement.remove();
};
for (const deleteProductElement of deleteProductElements) {
  deleteProductElement.addEventListener("click", deleteProduct);
}
