import { fetchProducts } from "./services/api.js";
import { renderProductCard } from "./components/RenderProductCard.js";
import { initQtyControl } from "./components/QtyControl.js";
import { initOrderPanel } from "./components/OrderPanel.js";
import { initCartDetails } from "./components/CartDetails.js";

async function loadData() {
  try {
    const data = await fetchProducts();

    // 1) producten tekenen
    renderProductCard(data);

    // 2) qty knoppen activeren
    initQtyControl();

    // 3) orderpanel (header) + cart-update event
    initOrderPanel();

    // 4) rechter "Your Cart" kolom laten luisteren/renderen
    initCartDetails();
  } catch (err) {
    console.error("Er is wat mis gegaan met inladen:", err.message);
  }
}

loadData();
