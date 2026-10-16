"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Tamara 
 */

"use strict";

/*
 * Laboration 6 - Receptsökaren
 * Namn: DITT NAMN
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
searchForm.addEventListener("submit", function (event) {
    // Förhindra att sidan laddas om.
    event.preventDefault();

    // Läs sökfrasen och ta bort extra mellanslag.
    const searchTerm = searchInput.value.trim();

    // Kontrollera sökfrasen.
    if (!validateSearch(searchTerm)) {
        return;
    }

    // Visa sökfrasen i konsolen tills vi kopplar in API:t.
    console.log("Search term:", searchTerm);
});


