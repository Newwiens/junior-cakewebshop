/*
 /js/components/OrderPanel.js
 ==============================
Verantwoordelijk voor:
- Header order-panel (totaal bedrag + aantal bij het tasje)
- Cart-data bijhouden (winkelmand)
- Een 'cart:update' event uitsturen voor de rechter "Your Cart" kolom
*/

import { euro } from "../utils/format.js";

export function initOrderPanel() {
  // STAP 1: DOM-elementen verzamelen
  //----------------------------------
  const productsRoot = document.querySelector("#products");
  const countEl = document.querySelector(".order-panel__count");
  const amountEl = document.querySelector(".order-panel__amount");

  // Guard: als één van deze niet bestaat, stoppen alles
  if (!productsRoot || !countEl || !amountEl) {
    console.warn("[orderPanel] vereiste elementen niet gevonden");
    return;
  }

  /*
  STAP 2: interne winkelmand (state, kleine data-bases)
  ----------------------------------
  We maken een Map als "mini-database" voor de cart.
  key   = uniek product-id (bijv. d.id of d.name uit data-key)
  value = { qty, price } 
  */

  const store = new Map();

  // helper om items array te bouwen (handig voor de winkelmand)
  const buildItemsArray = () =>
    Array.from(store.entries()).map(([key, { qty, price, image }]) => ({
      //push-methode van array
      key,
      qty,
      price,
      image,
      lineTotal: qty * price,
    }));

  // totalen berekenen
  const computeTotals = () => {
    let totalQty = 0;
    let totalPrice = 0;
    for (const { qty, price } of store.values()) {
      totalQty += qty;
      totalPrice += qty * price;
    }
    return { totalQty, totalPrice };
  };

  //----------------------------------

  // STAP 3: UI bijwerken + cart:update uitsturen
  //----------------------------------

  const render = () => {
    const { totalQty, totalPrice } = computeTotals();

    // 3a. header rechtsboven
    countEl.textContent = String(totalQty);
    amountEl.textContent = euro.format(totalPrice);

    // 3b Shopping-List items opbouwen in de Map
    const items = buildItemsArray();

    //3c. Cart-update event versturen naar "Your cart" CartDetails.js component.
    document.dispatchEvent(
      new CustomEvent("cart:update", {
        detail: {
          items,
          totalQty,
          totalPrice,
        },
      })
    );
  };

  // STAP 4: luisteren naar qtychange (komt uit QtyControl)
  productsRoot.addEventListener("qtychange", (e) => {
    const { key, price, qty, image } = e.detail ?? {};

    if (!key || Number.isNaN(price) || typeof qty !== "number" || !image)
      return;

    if (qty <= 0) {
      store.delete(key);
    } else {
      store.set(key, { qty, price, image });
    }
    render();
  });

  // 5. EXTRA: item verwijderen via kruisje in de cart
  document.addEventListener("cart:remove-item", (event) => {
    const key = event.detail?.key;
    if (!key) return;

    // 5a) uit de store halen
    store.delete(key);

    // 5b) totals + cart-details + header opnieuw tekenen
    render();

    // 5c) bijbehorende product-card resetten (qty terug naar 0)
    const card = document.querySelector(`.product-card[data-key="${key}"]`);
    if (card) {
      const output = card.querySelector(".qty-value");
      if (output) {
        output.textContent = "0";
      }
      card.classList.remove("is-selected");
    }
  });

  // STAP 6: eerste render (0 items, € 0,00 + lege cart-update)
  render();
}
