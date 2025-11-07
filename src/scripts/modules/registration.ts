import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateSelect,
  validateHouseNumber,
} from "../utils/validation";
//import { fetcher } from "../utils/fetcher";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth } from "@/firebase";

const db = getFirestore();

const form: HTMLFormElement | null =
  document.querySelector("#registration-form");
const loginInput: HTMLInputElement | null | undefined =
  form?.querySelector("#login");
const passwordInput: HTMLInputElement | null | undefined =
  form?.querySelector("#password");
const confirmPasswordInput: HTMLInputElement | null | undefined =
  form?.querySelector("#confirm-password");
const citySelect: HTMLSelectElement | null | undefined =
  form?.querySelector("#city");
const streetSelect: HTMLSelectElement | null | undefined =
  form?.querySelector("#street");
const houseNumberInput: HTMLInputElement | null | undefined =
  form?.querySelector("#houseNumber");
const paymentMethodRadios = document.querySelectorAll<HTMLInputElement>(
  'input[name="paymentMethod"]'
);
const registrationButton: HTMLButtonElement | null | undefined =
  form?.querySelector("#login-btn");

if (
  !(form instanceof HTMLFormElement) ||
  !(loginInput instanceof HTMLInputElement) ||
  !(passwordInput instanceof HTMLInputElement) ||
  !(confirmPasswordInput instanceof HTMLInputElement) ||
  !(citySelect instanceof HTMLSelectElement) ||
  !(streetSelect instanceof HTMLSelectElement) ||
  !(houseNumberInput instanceof HTMLInputElement) ||
  paymentMethodRadios.length === 0 ||
  !(registrationButton instanceof HTMLButtonElement)
) {
  throw new Error("Registration form elements not found");
}

async function getCities(): Promise<Record<string, string[]>> {
  const response = await fetch("assets/cities.json");
  return await response.json();
}

function makeCityOptions(cities: Record<string, string[]>): void {
  Object.keys(cities).forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citySelect?.appendChild(option);
  });
}

function makeStreetOptions(city: string[]): void {
  streetSelect!.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Select street";
  placeholder.disabled = true;
  placeholder.selected = true;
  streetSelect!.appendChild(placeholder);
  if (!city) return;
  city.map((street) => {
    const option = document.createElement("option");
    option.value = street;
    option.textContent = street;
    streetSelect?.append(option);
  });
}

const cities = await getCities();
makeCityOptions(cities);
citySelect?.addEventListener("change", () => {
  const selectedCity = citySelect.value;
  makeStreetOptions(cities[selectedCity] || null);
});

registrationButton.disabled = true;

function handleValidation(
  input: HTMLInputElement | HTMLSelectElement,
  validateFn: (value: string) => string | null
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
  if (
    !loginInput ||
    !passwordInput ||
    !confirmPasswordInput ||
    !citySelect ||
    !streetSelect ||
    !houseNumberInput ||
    !registrationButton
  )
    return;
  const loginError = validateEmail(loginInput.value);
  const passwordError = validatePassword(passwordInput.value);
  const confirmPasswordError = validateConfirmPassword(
    passwordInput.value,
    confirmPasswordInput.value
  );
  const cityError = validateSelect(citySelect.value);
  const streetError = validateSelect(streetSelect.value);
  const houseNumberError = validateHouseNumber(houseNumberInput.value);
  registrationButton.disabled =
    !!loginError ||
    !!passwordError ||
    !!confirmPasswordError ||
    !!cityError ||
    !!streetError ||
    !!houseNumberError;
}

handleValidation(loginInput, validateEmail);
handleValidation(passwordInput, validatePassword);
handleValidation(confirmPasswordInput, () =>
  validateConfirmPassword(passwordInput.value, confirmPasswordInput.value)
);
handleValidation(streetSelect, validateSelect);
handleValidation(citySelect, validateSelect);
handleValidation(houseNumberInput, validateHouseNumber);

registrationButton.addEventListener("click", async (e) => {
  e.preventDefault();
  if (form.querySelector(".alert-error")) {
    form.querySelector(".alert-error")?.remove();
  }

  // const payload: RegistrationResponse = {
  //   login: loginInput.value,
  //   password: passwordInput.value,
  //   confirmPassword: confirmPasswordInput.value,
  //   city: citySelect.value,
  //   street: streetSelect.value,
  //   houseNumber: Number(houseNumberInput.value),
  //   paymentMethod:
  //     String(
  //       Array.from(paymentMethodRadios).find((radio) => radio.checked)?.value,
  //     ) || "",
  // };

  // const { data: res, error } = await fetcher<
  //   {
  //     data: RegistrationResponse;
  //     message?: string;
  //     error?: string;
  //   },
  //   LoginPayload
  // >(
  //   "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/auth/register",
  //   "#loader",
  //   {
  //     method: "POST",
  //     body: payload,
  //   },
  // );
  // const alert = document.createElement("div");
  // alert.className = "alert-error";
  // if (error) {
  //   alert.textContent = `Incorrect login or password`;
  //   form.append(alert);
  // }
  // if (res) {
  //   alert.textContent = `Registration successful! You can now sign in.`;
  //   form.append(alert);

  //   setTimeout(() => {
  //     window.location.href = "/login";
  //   }, 3000);
  // }
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      loginInput.value, // email
      passwordInput.value
    );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      login: loginInput.value,
      city: citySelect.value,
      street: streetSelect.value,
      houseNumber: Number(houseNumberInput.value),
      paymentMethod:
        Array.from(paymentMethodRadios).find((radio) => radio.checked)?.value ||
        "",
      createdAt: new Date().toISOString(),
    });

    const alert = document.createElement("div");
    alert.className = "alert-success";
    alert.textContent = "Registration successful! You can now sign in.";
    form.append(alert);

    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  } catch (error: any) {
    console.error(error);

    const alert = document.createElement("div");
    alert.className = "alert-error";

    if (error.code === "auth/email-already-in-use") {
      alert.textContent = "This email is already registered.";
    } else if (error.code === "auth/invalid-email") {
      alert.textContent = "Invalid email format.";
    } else if (error.code === "auth/weak-password") {
      alert.textContent = "Password should be at least 6 characters.";
    } else {
      alert.textContent = "Registration failed. Try again later.";
    }

    form.append(alert);
  }
});
