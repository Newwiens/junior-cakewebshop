// /js/components/OrderPanel.js
import { euro } from "../utils/format.js";

export function initOrderPanel() {
  const productsRoot = document.querySelector("#products");
  const countEl = document.querySelector(".order-panel__count");
  const amountEl = document.querySelector(".order-panel__amount");

  if (!productsRoot || !countEl || !amountEl) {
    console.warn("[orderPanel] vereiste elementen niet gevonden");
    return;
  }

  const store = new Map();

  const computeTotals = () => {
    let totalQty = 0;
    let totalPrice = 0;
    for (const { qty, price } of store.values()) {
      totalQty += qty;
      totalPrice += qty * price;
    }
    return { totalQty, totalPrice };
  };

  const render = () => {
    const { totalQty, totalPrice } = computeTotals();
    countEl.textContent = String(totalQty);
    amountEl.textContent = euro.format(totalPrice);
  };

  productsRoot.addEventListener("qtychange", (e) => {
    const { key, price, qty } = e.detail ?? {};
    if (!key || Number.isNaN(price) || typeof qty !== "number") return;

    if (qty <= 0) {
      store.delete(key);
    } else {
      store.set(key, { qty, price });
    }
    render();
  });

  render();
}
