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

    // 3b. Lees type actie btn voor console.log (data-action = "inc" of "dec")
    const action = clickedBtn.dataset.action;

    console.log("Knop geklikt:", action);
  });
}
