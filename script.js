let selectedProduct = "";

function chooseWA(product) {
  selectedProduct = product;
  document.getElementById("wa-popup").style.display = "block";
}

function sendWA(admin) {
  let number = admin === 1 ? "6287710238940" : "6283130830451";
  let msg = `Halo Admin, saya ingin membeli panel ${selectedProduct}`;
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(msg)}`);
}

function closePopup() {
  document.getElementById("wa-popup").style.display = "none";
}
