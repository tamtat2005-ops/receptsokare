"use strict";

/*
 * Laboration 6 - Receptsökaren
 * Namn: Tamara
 */

// Hämta formuläret, sökfältet och elementet för felmeddelanden.
const searchForm = document.querySelector("#searchform");
const searchInput = document.querySelector("#search");
const errorElement = document.querySelector("#error");

// Kontrollera att användaren har angett en sökfras.
function validateSearch(searchTerm) {
    errorElement.textContent = "";

    if (searchTerm.trim() === "") {
        errorElement.textContent = "Please enter a search term.";
        return false;
    }

    return true;
}

// Hantera när formuläret skickas.
searchForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("Formuläret fungerar!");

    // Läs sökfrasen och ta bort extra mellanslag.
    const searchTerm = searchInput.value.trim();

    // Kontrollera sökfrasen.
    if (!validateSearch(searchTerm)) {
        return;
    }

   // Hämta recept från API:t med användarens sökfras.
document.querySelector("#message").textContent = "";
await fetchRecipes(searchTerm);


    const url = `https://dummyjson.com/recipes/search?q=${encodeURIComponent(searchTerm)}`;

    try {
        // Skicka ett anrop till API:t.
        const response = await fetch(url);

        // Kontrollera om servern svarade med ett fel.
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        // Omvandla svaret från JSON till ett JavaScript-objekt.
        const data = await response.json();

        // Skriv ut resultatet i konsolen så att vi kan undersöka datan.
        console.log("API response:", data);

        // Kontrollera om det finns några recept.
        if (!data.recipes || data.recipes.length === 0) {
            document.querySelector("#message").textContent =
                "No recipes found. Please try another search term.";
            return;
        }

        // Visa bara det första receptet i konsolen i detta steg.
        console.log("First recipe:", data.recipes[0]);

    } catch (error) {
        // Visa teknisk information i konsolen och ett meddelande på sidan.
        console.error("Error fetching recipes:", error);

        document.querySelector("#message").textContent =
            "Could not fetch recipes. Please try again.";
    }

});

// Hämtar recept från DummyJSON med användarens sökfras.
async function fetchRecipes(searchTerm) {
    const url = `https://dummyjson.com/recipes/search?q=${encodeURIComponent(searchTerm)}`;

    try {
        // Skicka ett anrop till API:t.
        const response = await fetch(url);

        // Kontrollera att servern svarade utan fel.
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        // Omvandla JSON-svaret till JavaScript-data.
        const data = await response.json();

        console.log("API response:", data);

        // Kontrollera om sökningen gav några recept.
        if (!Array.isArray(data.recipes) || data.recipes.length === 0) {
            document.querySelector("#message").textContent =
                "No recipes found. Please try another search term.";
            return;
        }

        // Visa det första receptet i konsolen under testet.
        console.log("First recipe:", data.recipes[0]);

        document.querySelector("#message").textContent =
            `Recipe found: ${data.recipes[0].name}`;

    } catch (error) {
        console.error("Error fetching recipes:", error);

        document.querySelector("#message").textContent =
            "Could not fetch recipes. Please try again.";
    }
}
