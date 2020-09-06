// Объявления переменных
const validationSettings = {
  formSelector: ".form",
  inputSelector: ".form__text",
  invalidInputClass: "form__text_invalid",
  submitSelector: ".form__button-submit",
  submitDisabledClass: "form__button-submit_disabled",
};


// Объявления функций
const hasInvalidInput = function (inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleSubmitState = function (
  inputList,
  submitButton,
  { submitDisabledClass, ...rest }
) {
  submitButton.classList[hasInvalidInput(inputList) ? "add" : "remove"](
    submitDisabledClass
  );
};

const validateInput = function (form, input, { invalidInputClass, ...rest }) {
  const inputError = form.querySelector(`#${input.id}-error`);
  input.classList[input.validity.valid ? "remove" : "add"](invalidInputClass);
  inputError.textContent = input.validationMessage;
};

const setInputListeners = function (
  form,
  { inputSelector, submitSelector, ...rest }
) {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const submitButton = form.querySelector(submitSelector);
  toggleSubmitState(inputList, submitButton, rest);
  inputList.forEach((input) => {
    input.addEventListener("input", function (event) {
      validateInput(form, input, rest);
      toggleSubmitState(inputList, submitButton, rest);
    });
  });
};

const enableValidation = function ({ formSelector, ...rest }) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((form) => {
    setInputListeners(form, rest);
  });
};

const clearForm = function (form) {
  if (form) {
    form.reset();
    const inputList = Array.from(
      form.querySelectorAll(validationSettings.inputSelector)
    );
    const submitButton = form.querySelector(validationSettings.submitSelector);
    inputList.forEach((input) => {
      const inputError = form.querySelector(`#${input.id}-error`);
      inputError.textContent = "";
      input.classList.remove(validationSettings.invalidInputClass);
    });
    submitButton.classList.add(validationSettings.submitDisabledClass);
  }
};


// Точка входа
enableValidation(validationSettings);
