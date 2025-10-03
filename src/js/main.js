async function loadData() {
  try {
    // STAP 1: Probeer data op te halen
    /* ----- Voor Vercel deploy ------*/
    // const response = await fetch("public/data/data.json");

    /* --------- Local host ---------- */
    const response = await fetch("public/data/data.json");

    // STAP 2: Check of response OK is
    if (!response.ok) {
      throw new Error(`fout met inladen ${response.status}`);
    }

    // STAP 3: Probeer JSON eruit te halen
    const data = await response.json();

    const ul = document.querySelector("#product-list");
    ul.innerHTML = "";

    data.forEach((d) => {
      const li = document.createElement("li"); // Maak <li>
      li.textContent = d.name; // vul met productnaam
      ul.appendChild(li); // Voeg toe aan de <ul> lijst
    });

    // STAP 4: Gebruik de data
    console.log("data is ingeladen", data);
  } catch (err) {
    // Dit blok wordt uitgevoerd ALS er in try iets misgaat
    console.error("Er is wat mis gegaan met inladen:", err.message);
  }
}

loadData();
