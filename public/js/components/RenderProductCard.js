import { euro } from "../utils/format.js";

export function renderProductCard(products) {
  const template = document.querySelector("#product-template");
  const sectionCard = document.querySelector("#products");

  // DocumentFragment = performanter bij veel elementen
  const fragment = document.createDocumentFragment();

  // STAP 3: Loop door alle producten
  products.forEach((d) => {
    //clone het template
    const clone = template.content.cloneNode(true);

    // De velden in vullen
    const img = clone.querySelector(".product-card__img");
    img.src = d.image.desktop;
    img.alt = d.name;

    clone.querySelector(".product-card__name").textContent = d.name;
    clone.querySelector(".product-card__category").textContent = d.category;
    clone.querySelector(".product-card__price").textContent = euro.format(
      d.price
    );

    fragment.appendChild(clone);
  });

  // Replace i.p.v. append → voorkomt dubbel renderen
  sectionCard.replaceChildren(fragment);
}
