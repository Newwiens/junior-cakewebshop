// hulpfuncties om state-klassetje te beheren
function activateAddCart(zoneEl) {
  zoneEl.classList.add("is-active");
}
function deactivateAddCart(zoneEl) {
  zoneEl.classList.remove("is-active");
}

// voorbeeld delegation (koppel op je grid)
document.getElementById("products").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const card = btn.closest(".product-card");
  const zone = card.querySelector(".product-card__add-cart");
  const out = card.querySelector(".qty-value");

  const action = btn.dataset.action; // "add" | "inc" | "dec"

  // lees huidige qty uit output
  const current = Number(out.value || out.textContent || 0);

  if (action === "add") {
    const next = 1;
    out.textContent = String(next);
    activateAddCart(zone); // blijf rood + qty zichtbaar
    // TODO: cartStore.setQty(product, next)
  }

  if (action === "inc") {
    const next = current + 1;
    out.textContent = String(next);
    activateAddCart(zone); // blijft actief
    // TODO: cartStore.setQty(product, next)
  }

  if (action === "dec") {
    const next = Math.max(0, current - 1);
    out.textContent = String(next);
    if (next === 0) {
      deactivateAddCart(zone); // terug naar normaal (alleen hover toont rood)
      // optioneel: ook UI resetten, bv. add-btn tonen als je die wisselt
    } else {
      activateAddCart(zone);
    }
    // TODO: cartStore.setQty(product, next)
  }
});
