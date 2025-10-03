async function loadData() {
  try {
    console.log("✅ main.js gestart");
    // STAP 1: DATA OPHALEN
    /* ----- Voor Vercel deploy & public local server ------*/
    const response = await fetch("/data/data.json"); // Puur JSON data ophalen met GET-methode en sla de info op response

    /*---------------------
    - response is een variable naam dat meegeven is bij de fetch-methode
      - response bevat alles wat de server terugstuurt — niet de data zelf, maar het antwoordobject.
      - .ok = eigenschappen van zogenemame Response object
        - geeft een booleans terug (true/false)
      - .status = HTTP-statuscode (200, 400, 500)
    */

    if (!response.ok) {
      throw new Error(`fout met inladen ${response.status}`);
    }

    // STAP 2: Probeer JSON eruit te halen
    const data = await response.json();

    const template = document.querySelector("#product-template");
    const sectionCard = document.querySelector("#products");

    // DocumentFragment = performanter bij veel elementen
    const fragment = document.createDocumentFragment();

    // STAP 3: Loop door alle producten
    data.forEach((d) => {
      //clone het template
      const clone = template.content.cloneNode(true);

      // De vulden in vullen
      const img = clone.querySelector(".product-card__img");
      img.src = d.image.desktop;
      img.alt = d.name;

      clone.querySelector(".product-card__name").textContent = d.name;
      clone.querySelector(".product-card__category").textContent = d.category;
      clone.querySelector(
        ".product-card__price"
      ).textContent = `€${d.price.toFixed(2)}`;

      fragment.appendChild(clone);
    });

    sectionCard.appendChild(fragment);

    // STAP 4: Gebruik de data
    console.log("data is ingeladen", data.length, "items");
  } catch (err) {
    // Dit blok wordt uitgevoerd ALS er in try iets misgaat
    console.error("Er is wat mis gegaan met inladen:", err.message);
  }
}

loadData();
