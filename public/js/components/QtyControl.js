export function initQtyControl() {
  // 1. Container waar alle producten in zitten $products
  const productSection = document.querySelector("#products");

  // 2. check of de juiste container gepakt
  if (!productSection) {
    console.warn("qtyControl: niet gevonden.");
  }

  // 3. EventsListerner
  productSection.addEventListener("click", (event) => {
    // 3a. Check class .qty-btn geklikt?
    const clickedBtn = event.target.closest(".qty-btn");
    if (!clickedBtn) return; //--> //Als niet klikt, stoppen

    // 3b. Zoek naar ouder div waar de qty-btn in zitten
    const controls = clickedBtn.closest(".qty-controls");
    if (!controls) return;

    // 3c. Zoek het element waar de waarde wordt weergegeven
    const output = controls.querySelector(".qty-value");
    if (!output) return;

    // 3d. Lees huidige waarde e nzet om naar getal
    // parseInt = string omzet naar getal
    let value = parseInt(output.textContent, 10); // --> JS lees menselijk getal 0-9 (base 10)
    if (Number.isNaN(value)) value = 0; //-->

    // 3e. Lees type actie btn voor console.log (data-action = "inc" of "dec")
    const action = clickedBtn.dataset.action;

    // 3f. Pas waarde aan
    if (action === "inc") {
      value += 1;
    } else if (action === "dec") {
      value = Math.max(0, value - 1);
    }
    // 3g. Schrijf nieuwe waarde terug naar UI
    output.textContent = value;

    // 3h. add button rood vlak kleur

    const card = clickedBtn.closest(".product-card");
    if (card) {
      if (value > 0) card.classList.add("is-selected");
      else card.classList.remove("is-selected");
    }

    // 3h. Voor test
    console.log("Nieuwe waarde:", value);
  });
}
