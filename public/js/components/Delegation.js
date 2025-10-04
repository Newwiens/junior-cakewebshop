// public/js/components/ProductGridDelegation.js
export function attachProductGridDelegation(rootEl, products, handlers = {}) {
  const { onAdd, onInc, onDec } = handlers;

  rootEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const action = btn.dataset.action;
    const card = btn.closest(".product-card");
    if (!card) return;

    const id = card.dataset.id;
    const product = products.find((p) => String(p.id) === String(id));
    if (!product) return;

    const addBtn = card.querySelector(".add-btn");
    const controls = card.querySelector(".qty-controls");
    const out = card.querySelector(".qty-value");

    // Hulpfuncties om UI te togglen
    const showControls = () => {
      addBtn?.classList.add("hidden");
      controls?.classList.remove("hidden");
    };
    const showAddBtn = () => {
      controls?.classList.add("hidden");
      addBtn?.classList.remove("hidden");
    };

    switch (action) {
      case "add": {
        // UI
        showControls();
        if (out) out.textContent = "1";
        // Callback naar jouw (straks) cart-logica
        onAdd?.(product, 1);
        // Event voor andere delen (optioneel)
        card.dispatchEvent(
          new CustomEvent("cart:add", {
            bubbles: true,
            detail: { product, qty: 1 },
          })
        );
        break;
      }

      case "inc": {
        const current = Number(out?.textContent ?? 0);
        const next = current + 1;
        if (out) out.textContent = String(next);
        onInc?.(product, next);
        card.dispatchEvent(
          new CustomEvent("cart:inc", {
            bubbles: true,
            detail: { product, qty: next },
          })
        );
        break;
      }

      case "dec": {
        const current = Number(out?.textContent ?? 1);
        const next = current - 1;
        if (next <= 0) {
          // terug naar Add-knop
          showAddBtn();
          if (out) out.textContent = "1"; // reset UI
          onDec?.(product, 0);
          card.dispatchEvent(
            new CustomEvent("cart:dec", {
              bubbles: true,
              detail: { product, qty: 0 },
            })
          );
        } else {
          if (out) out.textContent = String(next);
          onDec?.(product, next);
          card.dispatchEvent(
            new CustomEvent("cart:dec", {
              bubbles: true,
              detail: { product, qty: next },
            })
          );
        }
        break;
      }
    }
  });
}
