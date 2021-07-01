// hjalp funktion for att kolla om nagot ar ett objekt.
const isObject = (val) => typeof val == "object";

// hjalp funktion for att skapa ett error
const error = (message, input) => ({ message: message, input });

// hamta alla element
const form = document.getElementById("form");
const fields = form.querySelectorAll("input");
const button = document.getElementById("button");

// validering for varje falt
const VALIDATORS = {
  firstname: function (input) {
    return input.value.length >= 2
      ? null
      : error("First name must be >= 2", input);
  },
  lastname: function (input) {
    return input.value.length >= 2
      ? null
      : error("Last name must be >= 2", input);
  },
  email: function (input) {
    return input.value.includes("@")
      ? null
      : error("This does not look like an email", input);
  },
  password: function (input) {
    return input.value.length >= 6
      ? null
      : error("Password must be >= 6", input);
  },
  password_confirm: function (input, allFields) {
    const passwordField = allFields.filter(
      (field) => field.name === "password"
    )[0];
    console.log(passwordField);
    console.log(passwordField.value, input.value);
    return input.value == passwordField.value
      ? null
      : error("Passwords must match", input);
  },
  agree: function (input) {
    return input.checked ? null : error("You need to agree", input);
  },
};

// lyssna pa klick pa knapp.
button.addEventListener("click", function (event) {
  event.preventDefault();
  const allFields = Array.from(fields);

  // validera alla falt, vi far tillbaka en lista med antingen objekt eller null.
  const errors = allFields.map((field) =>
    VALIDATORS[field.name](field, allFields)
  );

  // filtrera alla errors sa att vi bara far dom som inte ar null.
  const actualErrors = Array.from(errors.filter((error) => error != null));

  // ta bort alla errors
  allFields.forEach(function (input) {
    const existing = Array.from(input.parentNode.querySelectorAll("i") || []);
    existing.forEach((ex) => ex.parentNode.removeChild(ex));
  });

  // visa alla errors
  actualErrors.forEach(function (error) {
    const errorElement = document.createElement("i");
    errorElement.style.color = "red";
    errorElement.innerText = error.message;
    error.input.parentNode.appendChild(errorElement);
  });
});