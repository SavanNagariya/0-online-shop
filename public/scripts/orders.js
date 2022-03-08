const formOrdersStatusElement = document.querySelectorAll(".orders-status");

allOrdersStatus = async (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const id = formData.get("orderid");
  const status = formData.get("status");
  const csrf = formData.get("_csrf");
  let resp;
  try {
    resp = await fetch("/orders/" + id, {
      method: "PATCH",
      body: JSON.stringify({
        status: status,
        _csrf: csrf,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("resp error");
    return;
  }
  if (!resp.ok) {
    alert("resp wrong");
    return;
  }
};

for (const ordersStatus of formOrdersStatusElement) {
  ordersStatus.addEventListener("submit", allOrdersStatus);
}
