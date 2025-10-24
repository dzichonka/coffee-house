import { validateEnglishLetters } from "../utils/validateEnglishLetters";

export function validateLogin(value: string): string | null {
  if (value.length < 3) return "Login must be at least 3 characters";
  if (!validateEnglishLetters(value)) {
    return "Only English letters allowed";
  }
  if (!/^[A-Za-z]/.test(value)) return "Login must start with a letter";
  return null;
}

export function validatePassword(value: string): string | null {
  if (value.length < 6) return "Password must be at least 6 characters";
  // if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
  //   return "Password must contain a special character";
  if (!/\d/.test(value)) return "Password must contain a number";
  return null;
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string,
): string | null {
  if (confirmPassword.length === 0) return "Please confirm your password";
  if (confirmPassword !== password) return "Passwords do not match";
  return null;
}

export function validateSelect(value: string): string | null {
  if (!value) return "Please select an option";
  return null;
}

export function validateHouseNumber(value: string): string | null {
  const num = Number(value);
  if (!value) return "House number is required";
  if (isNaN(num)) return "Must be a number";
  if (num <= 0) return "Number must be positive";
  return null;
}
