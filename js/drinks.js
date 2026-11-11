// =========================================================
// DRINK REQUESTS form
//
// Paste a Google Apps Script Web App URL here to receive requests
// in a Google Sheet (see README → "Connect the drink request form").
// While this is blank, the form still looks like it works for guests
// but requests are NOT saved anywhere.
// =========================================================
const DRINK_ENDPOINT = "";

const drinkForm = document.getElementById("drink-form");
const drinkThanks = document.getElementById("drink-thanks");
const drinkAgain = document.getElementById("drink-again");

drinkForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(drinkForm);
  if (DRINK_ENDPOINT) {
    // Apps Script doesn't send CORS headers, so the browser can't read the
    // response — the row is still written. Errors are swallowed on purpose.
    fetch(DRINK_ENDPOINT, { method: "POST", body: data }).catch(() => {});
  } else {
    console.warn("DRINK_ENDPOINT is not set — this request was not saved.");
  }
  drinkForm.hidden = true;
  drinkThanks.hidden = false;
});

drinkAgain.addEventListener("click", () => {
  drinkForm.reset();
  drinkThanks.hidden = true;
  drinkForm.hidden = false;
  drinkForm.querySelector("input[name='drink']").focus();
});
