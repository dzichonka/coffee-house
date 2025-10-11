import globals from "globals";
import js from "@eslint/js";

export default [
  {
    ignores: ["dist/**"],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      indent: ["error", 2],
      quotes: ["error", "double"],
      semi: ["error", "always"],
    },
  },
];
