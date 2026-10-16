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
       displayRecipe(data.recipes[0]);

    } catch (error) {
        console.error("Error fetching recipes:", error);

        document.querySelector("#message").textContent =
            "Could not fetch recipes. Please try again.";
    }
}

/**
 * Skapar och visar receptets innehåll på webbsidan.
 */
function displayRecipe(recipe) {
    const recipeSection = document.querySelector("#recipe");

    // Rensa tidigare recept innan det nya visas.
    recipeSection.replaceChildren();

    // Skapa receptets huvudcontainer.
    const article = document.createElement("article");

    // Visa receptets namn.
    const title = document.createElement("h3");
    title.textContent = recipe.name;
    article.appendChild(title);

    // Visa receptets bild.
    const image = document.createElement("img");
    image.src = recipe.image;
    image.alt = recipe.name;
    article.appendChild(image);

    // Visa information om portioner och tillagningstider.
    const info = document.createElement("div");
    info.className = "recipe-info";

    const details = [
        ["Servings:", recipe.servings],
        ["Prep time:", `${recipe.prepTimeMinutes} minutes`],
        ["Cooking time:", `${recipe.cookTimeMinutes} minutes`],
        ["Difficulty:", recipe.difficulty]
    ];

    details.forEach(function (detail) {
        const paragraph = document.createElement("p");
        const strong = document.createElement("strong");

        strong.textContent = detail[0] + " ";
        paragraph.appendChild(strong);
        paragraph.appendChild(document.createTextNode(detail[1]));

        info.appendChild(paragraph);
    });

    article.appendChild(info);

    // Skapa rubrik och punktlista för ingredienser.
    const ingredientsTitle = document.createElement("h4");
    ingredientsTitle.textContent = "Ingredients";
    article.appendChild(ingredientsTitle);

    const ingredientsList = document.createElement("ul");

    recipe.ingredients.forEach(function (ingredient) {
        const item = document.createElement("li");
        item.textContent = ingredient;
        ingredientsList.appendChild(item);
    });

    article.appendChild(ingredientsList);

    // Skapa rubrik och numrerad lista för instruktioner.
    const instructionsTitle = document.createElement("h4");
    instructionsTitle.textContent = "Instructions";
    article.appendChild(instructionsTitle);

    const instructionsList = document.createElement("ol");

    recipe.instructions.forEach(function (instruction) {
        const item = document.createElement("li");
        item.textContent = instruction;
        instructionsList.appendChild(item);
    });

    article.appendChild(instructionsList);

    // Lägg till det färdiga receptet på webbsidan.
    recipeSection.appendChild(article);
}

/**
 * Hanterar formuläret när användaren söker efter ett recept.
 */
searchForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const searchTerm = searchInput.value.trim();

    // Kontrollera att sökfrasen inte är tom.
    if (!validateSearch(searchTerm)) {
        return;
    }

    // Ta bort tidigare recept och meddelanden.
    document.querySelector("#recipe").replaceChildren();
    document.querySelector("#message").textContent = "";

    // Hämta och visa det nya receptet.
    await fetchRecipes(searchTerm);
});
