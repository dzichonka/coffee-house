export function validateEnglishLetters(value: string): boolean {
  const letters = value.match(/\p{L}/gu);
  if (!letters) return true;
  return letters.every((l) => /^[A-Za-z]$/.test(l));
}
