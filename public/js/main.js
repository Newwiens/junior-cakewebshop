import { fetchProducts } from "./services/api.js";
import { renderProductCard } from "./components/RenderProductCard.js";
import { initQtyControl } from "./components/QtyControl.js";
import { initOrderPanel } from "./components/OrderPanel.js";

async function loadData() {
  try {
    console.log("✅ main.js gestart");

    //1 Data ophalen
    const data = await fetchProducts();

    //2 Render Product card via Component
    renderProductCard(data);

    //3 Render QtyControl
    initQtyControl();

    initOrderPanel();

    console.log("data is ingeladen", data.length, "items");
  } catch (err) {
    console.error("Er is wat mis gegaan met inladen:", err.message);
  }
}

loadData();
