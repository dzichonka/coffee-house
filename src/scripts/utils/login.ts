import { validateEnglishLetters } from "./validateEnglishLetters";
import { fetcher } from "./fetcher";

const form: HTMLFormElement | null = document.querySelector("#login-form");
const loginInput: HTMLInputElement | null = document.querySelector("#login");
const passwordInput: HTMLInputElement | null =
  document.querySelector("#password");
const loginButton: HTMLButtonElement | null =
  document.querySelector("#login-btn");

if (!form || !loginInput || !passwordInput || !loginButton) {
  throw new Error("Login form elements not found");
}

loginButton.disabled = true;

function validateLogin(value: string): string | null {
  if (value.length < 3) return "Login must be at least 3 characters";
  if (!validateEnglishLetters(value)) {
    return "Only English letters allowed";
  }
  if (!/^[A-Za-z]/.test(value)) return "Login must start with a letter";
  return null;
}

function validatePassword(value: string): string | null {
  if (value.length < 6) return "Password must be at least 6 characters";
  // if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
  //   return "Password must contain a special character";
  if (!/\d/.test(value)) return "Password must contain a number";
  return null;
}

function handleValidation(
  input: HTMLInputElement,
  validateFn: (value: string) => string | null,
) {
  const errorSpan = input.nextElementSibling;

  if (!(errorSpan instanceof HTMLSpanElement) || !errorSpan) {
    throw new Error("Error span not found");
  }

  input.addEventListener("blur", () => {
    const error = validateFn(input.value);
    if (error) {
      input.classList.add("invalid");
      errorSpan.textContent = error;
      errorSpan.classList.add("active");
    } else {
      input.classList.add("valid");
    }

    updateButtonState();
  });

  input.addEventListener("focus", () => {
    input.classList.remove("invalid");
    input.classList.remove("valid");
    errorSpan.textContent = "";
    errorSpan.classList.remove("active");
  });
}

function updateButtonState() {
  if (!loginInput || !passwordInput || !loginButton) return;
  const loginError = validateLogin(loginInput.value);
  const passwordError = validatePassword(passwordInput.value);
  loginButton.disabled = !!loginError || !!passwordError;
}

handleValidation(loginInput, validateLogin);
handleValidation(passwordInput, validatePassword);

loginButton.addEventListener("click", async (e) => {
  e.preventDefault();
  if (form.querySelector(".alert-error")) {
    form.querySelector(".alert-error")?.remove();
  }
  if (!loginInput || !passwordInput) return;

  const payload = {
    login: loginInput.value,
    password: passwordInput.value,
  };

  const { data: res, error } = await fetcher<
    {
      data: LoginResponse;
      message?: string;
      error?: string;
    },
    LoginPayload
  >(
    "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/auth/login",
    "#loader",
    {
      method: "POST",
      body: payload,
    },
  );

  if (error) {
    const alert = document.createElement("div");
    alert.className = "alert-error";
    alert.textContent = `Incorrect login or password`;
    form.append(alert);
  }
  if (res && res.data) {
    window.location.href = "index";
  }
});
