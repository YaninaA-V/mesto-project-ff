const showInputError = (
  formProfileElement,
  inputElement,
  errorMessage,
  validationConfig
) => {
  const errorElement = formProfileElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formProfileElement, inputElement, validationConfig) => {
  const errorElement = formProfileElement.querySelector(`.${inputElement.id}-error`);
  if(errorElement) {
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = "";
  }  
};

const isValid = (formProfileElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formProfileElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formProfileElement, inputElement, validationConfig);
  }
};

const setEventListeners = (formProfileElement, validationConfig) => {
  const inputList = Array.from(
    formProfileElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formProfileElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formProfileElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formProfileElement) => {
    setEventListeners(formProfileElement, validationConfig);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

const clearValidation = (formProfileElement, validationConfig) => {
  const {inputSelector, inactiveButtonClass, submitButtonSelector} = validationConfig;
  const inputList = Array.from(formProfileElement.querySelectorAll(inputSelector));
  const buttonElement = formProfileElement.querySelector(submitButtonSelector);
  inputList.forEach(input => {
    hideInputError(formProfileElement, input, validationConfig);
  })
  buttonElement.classList.add(inactiveButtonClass)
}

export { enableValidation, clearValidation };
