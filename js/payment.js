document.addEventListener("DOMContentLoaded", () => {
  const total = sessionStorage.getItem("cartTotal") || 0;
  document.getElementById("orderTotal").textContent = total;
});
document.getElementById("paymentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const cardNumber = document.getElementById("cardNumber").value.trim();
  const expiry = document.getElementById("expiry").value;
  const cvv = document.getElementById("cvv").value.trim();
  const messageDiv = document.getElementById("message");

  if (name === "" || cardNumber.length !== 16 || cvv.length !== 3) {
    messageDiv.style.color = "red";
    messageDiv.textContent = "Invalid payment details. Please check and try again.";
    return;
  }

  // Fake delay to simulate processing
  messageDiv.style.color = "green";
  messageDiv.textContent = "Processing payment...";

  setTimeout(() => {
    messageDiv.textContent = "🎉 Payment Successful! Thank you for your order.";
  }, 1500);
});
