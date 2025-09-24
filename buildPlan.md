# 🛒 Roadmap: Mini Webshop (Vanilla JS)

---

## 🔹 Fase 1 — Setup & Data

**🎯 Doel:** JSON kunnen uitlezen en iets tonen.

- [ ] Maak `index.html`, `data.json`, `main.js`.
- [ ] Schrijf in `main.js`: `fetch('./data.json')` en log de data.
- [ ] Render voorlopig een `<ul><li>` met productnamen.

✅ **Definition of done:** ik zie een lijst namen uit JSON in de browser.

---

## 🔹 Fase 2 — Card component (via `<template>`)

**🎯 Doel:** Elk product netjes als kaart tonen.

- [ ] Voeg `<template>` toe in `index.html` voor één card.
- [ ] Clone template per product en vul titel, category, prijs, afbeelding.
- [ ] Gebruik `DocumentFragment` voor efficiënt appenden.

✅ **Definition of done:** ik zie cards met afbeelding, titel, categorie en prijs.

---

## 🔹 Fase 3 — Grid layout + Aside

**🎯 Doel:** Structuur zoals je design.

- [ ] Maak een grid voor de cards (`display: grid`).
- [ ] Zet rechts een `<aside>` neer voor de cart (nog leeg).
- [ ] Zorg dat layout ook werkt op mobiel (media query).

✅ **Definition of done:** links grid, rechts een cart-box.

---

## 🔹 Fase 4 — Add-to-Cart knop (logging)

**🎯 Doel:** Events begrijpen.

- [ ] Voeg in je template een knop **Add to Cart**.
- [ ] Koppel `click` event → `console.log("Add product", id)`.
- [ ] Gebruik `data-id` attribuut om product-id door te geven.

✅ **Definition of done:** klik → console toont product-id.

---

## 🔹 Fase 5 — Cart state + Render

**🎯 Doel:** Echte winkelmand vullen.

- [ ] Maak `let cart = []`.
- [ ] Bij klik: `cart.push(product)` of qty verhogen.
- [ ] Render cart in `<aside>` met productnamen en totaalbedrag.
- [ ] Gebruik `localStorage` om cart te bewaren.

✅ **Definition of done:** ik kan producten toevoegen, ze verschijnen in aside en blijven staan na reload.

---

## 🔹 Fase 6 — Quantity controls (+/−)

**🎯 Doel:** Items beheren.

- [ ] In cart: knoppen `+` en `−` om aantallen te veranderen.
- [ ] In cards: toon teller i.p.v. knop zodra qty > 0.
- [ ] Bij qty = 0 → verwijder item uit cart.

✅ **Definition of done:** ik kan aantallen beheren in zowel card als cart.

---

## 🔹 Fase 7 — Order Confirm modal

**🎯 Doel:** Flow afronden.

- [ ] Voeg `<dialog>` of eigen modal toe.
- [ ] Knop **Confirm Order** opent modal met overzicht.
- [ ] Knop **Start New Order** → cart leeg, UI reset.
- [ ] Toegankelijkheid: focus trap, `Esc` sluit modal.

✅ **Definition of done:** ik kan een order bevestigen en opnieuw beginnen.
