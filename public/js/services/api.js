export async function fetchProducts() {
  try {
    const response = await fetch("./data/data.json");

    if (!response.ok) {
      throw new Error(`Fout met inladen ${response.status}`);
    }
    return response.json();
  } catch (err) {
    // Dit blok wordt uitgevoerd ALS er in try iets misgaat
    console.error("Er is wat mis gegaan met inladen:", err);
    throw err;
  }
}
