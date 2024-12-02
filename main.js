document.addEventListener("DOMContentLoaded", () => {
    const addItemsButton = document.getElementById("add-items");
    const orderSummaryTable = document.getElementById("order-summary").querySelector("tbody");
    const totalPriceElement = document.getElementById("total-price");
    const saveFavouritesButton = document.getElementById("save-favourites");
    const applyFavouritesButton = document.getElementById("apply-favourites");
    const buyNowButton = document.getElementById("buy-now");
  
    let favourites = null;
  
    const updateOrderSummary = () => {
      let total = 0;
      orderSummaryTable.innerHTML = "";
      document.querySelectorAll(".items input").forEach((input) => {
        const quantity = parseInt(input.value) || 0;
        if (quantity > 0) {
          const name = input.dataset.name;
          const price = parseFloat(input.dataset.price) * quantity;
          total += price;
  
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${name}</td>
            <td>${quantity}</td>
            <td>$${price.toFixed(2)}</td>
          `;
          orderSummaryTable.appendChild(row);
        }
      });
      totalPriceElement.textContent = `$${total.toFixed(2)}`;
    };
  
    const saveToFavourites = () => {
      favourites = [];
      document.querySelectorAll(".items input").forEach((input) => {
        const quantity = parseInt(input.value) || 0;
        if (quantity > 0) {
          favourites.push({
            name: input.dataset.name,
            price: input.dataset.price,
            quantity: quantity,
          });
        }
      });
      localStorage.setItem("favourites", JSON.stringify(favourites));
      alert("Order saved as favourites!");
    };
  
    const applyFavourites = () => {
      const storedFavourites = JSON.parse(localStorage.getItem("favourites") || "[]");
      if (storedFavourites.length === 0) {
        alert("No favourites found.");
        return;
      }
      document.querySelectorAll(".items input").forEach((input) => {
        input.value = 0; // Reset all inputs
        storedFavourites.forEach((fav) => {
          if (input.dataset.name === fav.name) {
            input.value = fav.quantity;
          }
        });
      });
      updateOrderSummary();
    };
  
    const navigateToBuyPage = () => {
      alert("Redirecting to the buy page...");
      // Navigate to the buy page logic (placeholder)
    };
  
    addItemsButton.addEventListener("click", updateOrderSummary);
    saveFavouritesButton.addEventListener("click", saveToFavourites);
    applyFavouritesButton.addEventListener("click", applyFavourites);
    buyNowButton.addEventListener("click", navigateToBuyPage);
  });
  