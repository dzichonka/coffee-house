import { fetcher } from "../utils/fetcher";
import { useAppState } from "../state/appState";
import { validateLogin, validatePassword } from "../utils/validation";

const { setToken } = useAppState();

const form: HTMLFormElement | null = document.querySelector("#login-form");
const loginInput: HTMLInputElement | null | undefined =
  form?.querySelector("#login");
const passwordInput: HTMLInputElement | null | undefined =
  form?.querySelector("#password");
const loginButton: HTMLButtonElement | null | undefined =
  form?.querySelector("#login-btn");

if (
  !(form instanceof HTMLFormElement) ||
  !(loginInput instanceof HTMLInputElement) ||
  !(passwordInput instanceof HTMLInputElement) ||
  !(loginButton instanceof HTMLButtonElement)
) {
  throw new Error("Login form elements not found");
}

loginButton.disabled = true;

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
    setToken(res.data.access_token);
    window.location.href = "index";
  }
});
