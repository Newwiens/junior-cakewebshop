/*
/js/components/CartDetails.js
==============================
Verantwoordelijk voor de rechter kolom "Your Cart":
- Aantal in de titel (Your Cart (x))
- Lijst met items (naam, qty, prijs, lineTotal)
- Totaalbedrag onder "Order Total"
*/

import { euro } from "../utils/format.js";

export function initCartDetails() {
  // 1a: basis DOM-elementen binnen .shop__cart pakken
  // -----------------------------------------------------

  //pakt de hoofd element ".shop__cart"
  const cartRoot = document.querySelector(".shop__cart");

  //Eén guard: als er iets mist, stoppen we
  if (!cartRoot) {
    console.warn("[cart] .shop__cart niet gevonden");
    return;
  }

  //1b. pakt de kinderen element onder .shop__cart
  const countE1 = cartRoot.querySelector(".cart__count");
  const listE1 = cartRoot.querySelector(".cart__list");
  const emptyE1 = cartRoot.querySelector(".cart__empty");
  const totaalAmountE1 = cartRoot.querySelector(".cart__total-amount");
  const summaryE1 = cartRoot.querySelector(".cart__summary");

  //Eén guard: als er iets mist, stoppen we
  if (!countE1 || !listE1 || !emptyE1 || !totaalAmountE1 || !summaryE1) {
    console.warn("[cart] Eén of meer cart-elementen niet gevonden");
    return;
  }

  /*
2. render-functie voor de winkelmand
  // -----------------------------------------
  // data = { items: [...], totalQty: number, totalPrice: number }
  */
  const renderCart = (data) => {
    // 2a. variable aanmaken
    const items = data.items || [];
    const totalQty = data.totalQty ?? 0;
    const totalPrice = data.totalPrice ?? 0;

    // 2b. Aantal in de titel bijwerken: Your Cart (x)
    countE1.textContent = String(totalQty);

    // 2c. Lege lijst
    if (items.length === 0) {
      emptyE1.style.display = "flex";
      listE1.innerHTML = "";
      totaalAmountE1.textContent = euro.format(0);
      summaryE1.style.display = "none";
      return;
    }

    // 2d. Lijst items tonen: leeg bericht verbergen, lijst vullen
    emptyE1.style.display = "none";
    summaryE1.style.display = "flex";
    listE1.innerHTML = "";

    //3a. Lijst met items opbouwen
    //--------------------------------------------------------
    const fragment = document.createDocumentFragment();

    items.forEach((item) => {
      // item: { key, qty, price, lineTotal }
      const li = document.createElement("li");
      li.className = "cart__item";

      li.innerHTML = `
        <div class="cart__item-main">
          ${
            item.image
              ? `
            <img
              src="${item.image}"
              alt="${item.key}"
              class="cart__item-img"
            />
          `
              : ""
          }

          <div class="cart__item-info">
            <p class="cart__item-name">${item.key}</p>
            <p class="cart__item-meta">
              <span class="cart__item-qty">${item.qty}x</span>
              <span class="cart__item-add">@</span>
              <span class="cart__item-price">${euro.format(item.price)}</span>
              <span class="cart__item-line">${euro.format(
                item.lineTotal
              )}</span>
            </p>
          </div>

          <!-- kruisje om item te verwijderen -->
          <button
            class="cart__item-remove"
            type="button"
            aria-label="Remove ${item.key} from cart"
            data-key="${item.key}"
          >
           x
          </button>
        </div>
      `;
      fragment.appendChild(li);
    });
    listE1.appendChild(fragment);

    //3b. Totaalbedrag onder "Order Total" bijwerken
    totaalAmountE1.textContent = euro.format(totalPrice);
  };

  // STAP 4: luisteren naar cart:update events uit OrderPanel
  // --------------------------------------------------------
  document.addEventListener("cart:update", (event) => {
    const detail = event.detail || {};
    renderCart({
      items: detail.items || [],
      totalQty: detail.totalQty ?? 0,
      totalPrice: detail.totalPrice ?? 0,
    });
  });

  // 5. klikken op het kruisje in de cart → item volledig verwijderen
  // ----------------------------------------------------------------
  cartRoot.addEventListener("click", (event) => {
    const btn = event.target.closest(".cart__item-remove");
    if (!btn || !cartRoot.contains(btn)) return;

    const key = btn.dataset.key;
    if (!key) return;

    // stuur een event zodat OrderPanel de store kan updaten
    document.dispatchEvent(
      new CustomEvent("cart:remove-item", {
        detail: { key },
      })
    );
  });

  // 6: begin met een nette lege staat
  renderCart({ items: [], totalQty: 0, totalPrice: 0 });
}
